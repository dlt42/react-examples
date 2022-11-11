import React, { MouseEvent, useEffect, useRef, useState } from "react";
import JSONTree from "./JSONTree";
import './JSONViewer.css';

const fetchJson = (url: string, opts?: RequestInit | undefined): Promise<any> => {
  return fetch(url, opts)
      .then(resp => {
          if (resp.ok) {
              return resp.json()
                  .then(body => body as ResponseType)
                  .catch(err => {
                      throw new Error(`Response was not JSON: ${err}`);
                  });
          }
          throw new Error(`Response status was ${resp.status}`);
      })
      .catch((err: Error) => err);
}

const JSONViewer: React.FC = (): JSX.Element => {
  const [url, setUrl] = useState('http://openlibrary.org/search.json?q=the+lord+of+the+rings');
  const urlRef = useRef<HTMLInputElement>(null);
  const [json, setJson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchJson(url).then((value) => {
      setJson(value);
      setLoading(false);
    });
  },[url]);

  useEffect(() => {
    if (urlRef && urlRef.current)
      urlRef.current.value = url;
  }, [url, urlRef]);

  useEffect(() => {
    if (!loading && urlRef && urlRef.current)
      urlRef.current.value = url;
  }, [loading, urlRef, url]);

  const submitRef = (e: MouseEvent) => {
    if (loading) {
      return;
    }
    const urlValue = urlRef.current ? urlRef.current.value : null;
    if (urlValue) {
      setUrl(urlValue);
    }
  }
  return (
    <>
      <div className="Viewer-Input">
        { 
          loading 
          ? <h4>Loading</h4>
          : <>
            <input type="text" ref={urlRef} />
             <button onClick={(e: MouseEvent) => submitRef(e)}>Fetch</button>
            </>
        }
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
          
          <JSONTree isTop={true} elemKey={null} elemValue={json} />
          </article>
        </section>
      </div>
    </>
  );
}

export default JSONViewer;