
import React from "react";
import { useState } from "react";


interface JSONTreeProps {
  elemKey: string | null,
  elemValue: Record<string, any> | number | string | boolean,
  isTop?: boolean
}

interface JSONArrayItemProps {
  elemValue: Record<string, any> | number | string | boolean
}

const JSONBlock: React.FC<JSONTreeProps> = React.memo((props): JSX.Element => {
  const { elemKey, elemValue, isTop } = props;
  const [ toggle, setToggle ] = useState(isTop || !elemKey);
  const [ isArray ] = useState(Array.isArray(elemValue));
  return (
    <>
      { elemKey && 
        <div className="Json-Attribute-Name">
          { elemKey }
          <button onClick={(e) => setToggle(!toggle) }>
            {toggle ? '-' : '+' }
          </button>
        </div> }
      { 
        !isArray && toggle &&
        <div className="Json-Object">
          { 
            Object.entries(elemValue).map(([currentKey, currentValue], index) => (
              <JSONTree key={index + currentKey} elemKey={currentKey} elemValue={currentValue} isTop={false}/>
            ))
          }
        </div> 
      }
      { 
        isArray && toggle &&
        <div className="Json-Array">
          { 
            (elemValue as Record<string, any>).map((current: any, index: number) => (
              <JSONArrayItem key={index} elemValue={current} /> 
            ))
          }
        </div>
      }
    </>
  )
})

const JSONArrayItem: React.FC<JSONArrayItemProps> = React.memo((props): JSX.Element => {
  const { elemValue } = props;
  const [ hasValue ] = useState(elemValue !== undefined && elemValue !== null);
  const [ isObjectType ] = useState(hasValue && typeof elemValue === "object");
  return (
    <>
      { 
        !isObjectType && 
        <div className="Json-Attribute-Value">
          { (hasValue && elemValue.toString()) || "null" }
        </div> 
      }
      { 
        isObjectType && 
        <JSONBlock {...props} elemKey={null} isTop={false} /> 
      }
    </>
  )
})

const JSONTree: React.FC<JSONTreeProps> = React.memo((props): JSX.Element => {
  const { elemKey, elemValue } = props;
  const hasValue = elemValue !== undefined && elemValue !== null;
  const isObjectType = hasValue && typeof elemValue === "object";
  return (
    <div className="Json-Attribute">
      { 
        !isObjectType && 
          <div className="Json-Attribute-Name">
            {elemKey}
          </div>
      }
      { 
          !isObjectType && 
          <div className="Json-Attribute-Value">
              { (hasValue && elemValue.toString()) || "null" }
          </div> 
      }
      { 
        isObjectType && (
          <JSONBlock {...props} /> 
        )
      }
    </div>
  )
})

export default JSONTree;