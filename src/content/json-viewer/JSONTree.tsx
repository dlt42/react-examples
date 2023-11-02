import { FC, memo, useState } from 'react';

import Button from '../../components/Button/Button';

type Value = Record<string, unknown> | number | string | boolean;

type JSONTreeProps = {
  elemKey: string | null;
  elemValue: Value;
  path: string;
};

type JSONArrayItemProps = {
  elemValue: Value;
  path: string;
};

const JSONBlock: FC<JSONTreeProps> = memo((props): JSX.Element => {
  const { elemKey, elemValue, path } = props;
  const [toggle, setToggle] = useState(!path || !elemKey);
  const [isArray] = useState(Array.isArray(elemValue));
  return (
    <>
      {elemKey && (
        <div className='Json-Attribute-Name' title={path}>
          {elemKey}
          <Button onClick={() => setToggle(!toggle)}>
            {toggle ? `-` : `+`}
          </Button>
        </div>
      )}
      {!isArray && toggle && (
        <div className='Json-Object' title={!path ? `.` : path}>
          {Object.entries(elemValue).map(
            ([currentKey, currentValue], index) => (
              <JSONTree
                key={index + currentKey}
                elemKey={currentKey}
                elemValue={currentValue as unknown as Value}
                path={`${path}.${currentKey}`}
              />
            )
          )}
        </div>
      )}
      {Array.isArray(elemValue) && toggle && (
        <div className='Json-Array' title={path}>
          {elemValue.map((current: unknown, index: number) => (
            <JSONArrayItem
              key={index}
              elemValue={current as unknown as Value}
              path={`${path}[${index}]`}
            />
          ))}
        </div>
      )}
    </>
  );
});

const JSONArrayItem: FC<JSONArrayItemProps> = memo((props): JSX.Element => {
  const { elemValue, path } = props;
  const [hasValue] = useState(elemValue !== undefined && elemValue !== null);
  const [isObjectType] = useState(hasValue && typeof elemValue === `object`);
  return (
    <>
      {!isObjectType && (
        <div className='Json-Attribute-Value' title={path}>
          {(hasValue && JSON.stringify(elemValue)) || `null`}
        </div>
      )}
      {isObjectType && <JSONBlock {...props} elemKey={null} path={`${path}`} />}
    </>
  );
});

const JSONTree: FC<JSONTreeProps> = memo((props): JSX.Element => {
  const { elemKey, elemValue, path } = props;
  const hasValue = elemValue !== undefined && elemValue !== null;
  const isObjectType = hasValue && typeof elemValue === `object`;
  return (
    <div
      className={!path ? `Json-Root` : `Json-Attribute`}
      title={!path ? `.` : path}
    >
      {!isObjectType && (
        <div className='Json-Attribute-Name' title={path}>
          {elemKey}
        </div>
      )}
      {!isObjectType && (
        <div className='Json-Attribute-Value' title={path}>
          {(hasValue && elemValue.toString()) || `null`}
        </div>
      )}
      {isObjectType && <JSONBlock {...props} path={path} />}
    </div>
  );
});

export default JSONTree;
