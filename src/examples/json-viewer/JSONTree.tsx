import React from "react";
import { useState } from "react";


interface JSONTreeProps {
  depth: number,
  elemKey: string | null,
  elemValue: Record<string, any> | number | string | boolean
}

interface JSONArrayItemProps {
  depth: number,
  elemValue: Record<string, any> | number | string | boolean
}

const getStyle = (val: number) => {
  const hex = ((val * 20) % 256).toString(16);
  return { borderColor: `#${hex}${hex}${hex}` }
}

const JSONBlock: React.FC<JSONTreeProps> = ({ elemKey, elemValue, depth }): JSX.Element => {
  const [toggle, setToggle] = useState(depth === 0 || !elemKey);
  const isArray = Array.isArray(elemValue);
  return (
    <>
      { elemKey && 
        <div className="Json-Attribute-Name">
          {elemKey}
          <button onClick={(e) => setToggle(!toggle) }>{toggle ? '-' : '+' }</button>
        </div> }
      { !isArray && toggle &&
        <div className="Json-Object" style={getStyle(depth +1)}>
          { Object.entries(elemValue).map(([currentKey, currentValue], index) => ( 
              <JSONTree key={index + currentKey} elemKey={currentKey} elemValue={currentValue} depth={depth + 2}/>
            )) }
        </div> }
      { isArray && toggle &&
        <div className="Json-Array" style={getStyle(depth +1)}>
          { elemValue.map((current: any, index: number) => {
              return ( <JSONArrayItem key={index} elemValue={current} depth={depth + 2}/>);
          }) }
        </div>
      }
    </>
  )
}

const JSONArrayItem: React.FC<JSONArrayItemProps> = (props): JSX.Element => {
  const { elemValue } = props;
  const isObjectType = elemValue !== null && typeof elemValue === "object";
  return (
    <>
      { !isObjectType && <div className="Json-Attribute-Value">{ (elemValue || "").toString() }</div> }
      { isObjectType && <JSONBlock {...props} elemKey={null} /> }
    </>
  )
}

const JSONTree: React.FC<JSONTreeProps> = (props): JSX.Element => {
  const { elemKey, elemValue } = props;
  const isObjectType = elemValue !== null && typeof elemValue === "object";
  return (
    <div className="Json-Attribute">
      { !isObjectType && <div className="Json-Attribute-Name">{elemKey}</div> }
      { !isObjectType && <div className="Json-Attribute-Value">{ (elemValue + "").toString() }</div> }
      { isObjectType && <JSONBlock {...props} /> }
    </div>
  )
}

export default JSONTree;