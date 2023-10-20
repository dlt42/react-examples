import { FC, memo, useState } from "react";

interface JSONTreeProps {
  elemKey: string | null,
  elemValue: Record<string, any> | number | string | boolean,
  path: string
}

interface JSONArrayItemProps {
  elemValue: Record<string, any> | number | string | boolean,
  path: string
}

const JSONBlock: FC<JSONTreeProps> = memo((props): JSX.Element => {
  const { elemKey, elemValue, path } = props;
  const [ toggle, setToggle ] = useState(!path || !elemKey);
  const [ isArray ] = useState(Array.isArray(elemValue));
  return (
    <>
      { elemKey && 
        <div className="Json-Attribute-Name" title={path}>
          { elemKey }
          <button onClick={(e) => setToggle(!toggle) }>
            {toggle ? '-' : '+' }
          </button>
        </div> }
      { 
        !isArray && toggle &&
        <div className="Json-Object" title={!path ? "." : path}>
          { 
            Object.entries(elemValue).map(([currentKey, currentValue], index) => (
              <JSONTree key={index + currentKey} elemKey={currentKey} elemValue={currentValue} path={`${path}.${currentKey}`} />
            ))
          }
        </div> 
      }
      { 
        isArray && toggle &&
        <div className="Json-Array" title={path}>
          { 
            (elemValue as Record<string, any>).map((current: any, index: number) => (
              <JSONArrayItem key={index} elemValue={current} path={`${path}[${index}]`} /> 
            ))
          }
        </div>
      }
    </>
  )
})

const JSONArrayItem: React.FC<JSONArrayItemProps> = memo((props): JSX.Element => {
  const { elemValue, path } = props;
  const [ hasValue ] = useState(elemValue !== undefined && elemValue !== null);
  const [ isObjectType ] = useState(hasValue && typeof elemValue === "object");
  return (
    <>
      { 
        !isObjectType && 
        <div className="Json-Attribute-Value" title={path}>
          { (hasValue && elemValue.toString()) || "null" }
        </div> 
      }
      { 
        isObjectType && 
        <JSONBlock {...props} elemKey={null} path={`${path}`}/> 
      }
    </>
  )
})

const JSONTree: React.FC<JSONTreeProps> = memo((props): JSX.Element => {
  const { elemKey, elemValue, path } = props;
  const hasValue = elemValue !== undefined && elemValue !== null;
  const isObjectType = hasValue && typeof elemValue === "object";
  return (
    <div className={!path ? "Json-Root" : "Json-Attribute"} title={!path ? "." : path}>
      { 
        !isObjectType && 
          <div className="Json-Attribute-Name" title={path}>
            {elemKey}
          </div>
      }
      { 
          !isObjectType && 
          <div className="Json-Attribute-Value" title={path}>
              { (hasValue && elemValue.toString()) || "null" }
          </div> 
      }
      { 
        isObjectType && (
          <JSONBlock {...props} path={path}/> 
        )
      }
    </div>
  )
})

export default JSONTree;