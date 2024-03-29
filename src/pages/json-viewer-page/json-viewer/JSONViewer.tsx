import './JSONViewer.css';

import { FC, useEffect, useRef, useState } from 'react';

import Button from '../../../components/Button/Button';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import { ErrorWithContext } from '../../../global/ErrorWithContext';
import { getErrorMessage } from '../../../global/util';
import JSONTree from './JSONTree';

const fetchJson = (
  url: string,
  opts?: RequestInit | undefined
): Promise<unknown> =>
  fetch(url, opts).then((resp) => {
    if (resp.ok) {
      return resp
        .json()
        .then((body) => body as ResponseType)
        .catch((err) => {
          throw new Error(`Response was not JSON: ${err}`);
        });
    }
    throw new Error(`Response status was ${resp.status}`);
  });

const JSONViewerComponent: FC = () => {
  const [error, setError] = useState<Error | null>(null);
  if (error) {
    throw error;
  }
  const [url, setUrl] = useState<string | null>(null);
  const setExampleUrl = () => {
    setUrl(`https://openlibrary.org/search.json?q=the+lord+of+the+rings`);
  };
  const urlRef = useRef<HTMLInputElement>(null);
  const [json, setJson] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (url !== null) {
      setLoading(true);

      fetchJson(url)
        .then((value) => {
          setJson(value as unknown as object);
          setLoading(false);
        })
        .catch((e) =>
          setError(
            new ErrorWithContext(
              getErrorMessage(e as unknown),
              `JSONViewer > fetchJSON`
            )
          )
        );
    }
  }, [url]);
  useEffect(() => {
    if (urlRef && urlRef.current) urlRef.current.value = url || ``;
  }, [url, urlRef]);
  useEffect(() => {
    if (!loading && urlRef && urlRef.current) urlRef.current.value = url || ``;
  }, [loading, urlRef, url]);
  const submitRef = () => {
    if (loading) {
      return;
    }
    const urlValue = urlRef.current ? urlRef.current.value : null;
    if (urlValue) {
      setUrl(urlValue);
    }
  };
  if (loading) {
    return (
      <div className='Viewer-Input'>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <>
      <div className='Viewer-Input'>
        <input type='text' ref={urlRef} />
        <Button onClick={() => submitRef()}>Fetch</Button>
        <Button onClick={() => setExampleUrl()}>Fetch Example</Button>
      </div>
      <div className='Viewer-Main'>
        <section>
          <article>
            {JSON.stringify(json) !== '{}' ? (
              <>
                <h4>JSON Tree</h4>
                <details>
                  <summary>Key</summary>
                  <div className='Key-Container'>
                    <div className='Json-Attribute-Value-Color'>Value</div>
                    <div className='Json-Array-Color'>Array</div>
                    <div className='Json-Object-Color'>Object</div>
                  </div>
                </details>
                <JSONTree elemKey={null} elemValue={json} path='' />
              </>
            ) : (
              <>
                <h4>No JSON loaded</h4>
              </>
            )}
          </article>
        </section>
      </div>
    </>
  );
};

const JSONViewer = () => {
  return (
    <ErrorBoundary
      handleError={null}
      currentError={null}
      boundaryLocation='JSONViewer'
      throwUnhandled={false}
      className='JSONViewerBoundary'
    >
      <JSONViewerComponent />
    </ErrorBoundary>
  );
};

export default JSONViewer;
