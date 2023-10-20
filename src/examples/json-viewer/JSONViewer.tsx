import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import JSONTree from "./JSONTree";
import "./JSONViewer.css";
import ErrorBoundary from "../../error/ErrorBoundary";
import { ErrorWithContext } from "../../error/ErrorContext";
import { getErrorMessage } from "../../error/ErrorMessage";

const fetchJson = (url: string, opts?: RequestInit | undefined): Promise<any> =>
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

const JSONViewerComponent: FC = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  if (error) {
    throw error;
  }
  const [url, setUrl] = useState<string | null>(null);
  const setExampleUrl = () => {
    setUrl("https://openlibrary.org/search.json?q=the+lord+of+the+rings");
  };
  const urlRef = useRef<HTMLInputElement>(null);
  const [json, setJson] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (url !== null) {
      setLoading(true);

      fetchJson(url)
        .then((value) => {
          setJson(value);
          setLoading(false);
        })
        .catch((e) =>
          setError(
            new ErrorWithContext(getErrorMessage(e), "JSONViewer > fetchJSON")
          )
        );
    }
  }, [url]);
  useEffect(() => {
    if (urlRef && urlRef.current) urlRef.current.value = url || "";
  }, [url, urlRef]);
  useEffect(() => {
    if (!loading && urlRef && urlRef.current) urlRef.current.value = url || "";
  }, [loading, urlRef, url]);
  const submitRef = (e: MouseEvent) => {
    if (loading) {
      return;
    }
    const urlValue = urlRef.current ? urlRef.current.value : null;
    if (urlValue) {
      setUrl(urlValue);
    }
  };
  return (
    <>
      <div className="Viewer-Input">
        {loading ? (
          <h4>Loading</h4>
        ) : (
          <>
            <input type="text" ref={urlRef} />
            <button onClick={(e: MouseEvent) => submitRef(e)}>Fetch</button>
            <button onClick={() => setExampleUrl()}>Fetch Example</button>
          </>
        )}
      </div>
      <div className="Viewer-Main">
        <section>
          <article>
            <h4>JSON Tree</h4>
            <details>
              <summary>Key</summary>
              <div className="Key-Container">
                <div className="Json-Attribute-Value-Color">Value</div>
                <div className="Json-Array-Color">Array</div>
                <div className="Json-Object-Color">Object</div>
              </div>
            </details>
            <JSONTree elemKey={null} elemValue={json} path="" />
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
      boundaryLocation="JSONViewer"
      throwUnhandled={false}
      className="JSONViewerBoundary"
    >
      <JSONViewerComponent />
    </ErrorBoundary>
  );
};

export default JSONViewer;
