import React, { CSSProperties, FunctionComponent, memo, useEffect, useReducer, useState } from "react";
import "./Spinner.css"

export interface SpinnerProps {
  img: string;
}

interface SpinnerData {
  time: number,
  angle: number
}

const Spinner: FunctionComponent<SpinnerProps> = memo(({ img }): JSX.Element => {
  const [ spinnerStyle, setSpinnerStyle ] = useState<CSSProperties>({});
  const spinnerData: SpinnerData = { 
    time: new Date().getTime(), 
    angle: 0 
  };
  const [ , dispatchSpin ] = useReducer((last: SpinnerData) => {
    const result: SpinnerData = {
      time: new Date().getTime(),
      angle: last.angle
    }
    result.angle += ((result.time - last.time) / 50);
    setSpinnerStyle({
      transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${result.angle}deg) skew(0deg, 0deg)`
    });
   return result;
  }, spinnerData);
  useEffect(() => {
    const renderInterval: NodeJS.Timer = setInterval(() => dispatchSpin(),50);
    return () => clearInterval(renderInterval); 
  },[])
  return (
    <div className="Spinner-Container">
      <img 
        style={spinnerStyle} 
        src={img} 
        width="300" 
        className="Spinner-Style"  
        alt="" />
    </div>
  )
});

export default Spinner;