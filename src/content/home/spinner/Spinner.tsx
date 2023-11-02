import './Spinner.css';

import { FC, memo, RefObject, useEffect, useReducer, useRef } from 'react';

type SpinnerProps = {
  img: string;
  angleIncrement: number;
  intervalDuration: number;
};

type SpinnerContentProps = {
  img: string;
  spinnerRef: RefObject<HTMLImageElement>;
};

type SpinnerData = {
  time: number;
  angle: number;
};

const SpinnerContent: FC<SpinnerContentProps> = memo(
  ({ spinnerRef, img }): JSX.Element => (
    <div className='Spinner-Container'>
      <img
        ref={spinnerRef}
        src={img}
        width='300'
        className='Spinner-Style'
        alt=''
      />
    </div>
  )
);

const Spinner: FC<SpinnerProps> = memo(
  ({ img, angleIncrement, intervalDuration }): JSX.Element => {
    const spinnerRef: RefObject<HTMLImageElement> =
      useRef<HTMLImageElement>(null);
    const getSpinnerData = (lastSpinnerData?: SpinnerData): SpinnerData => {
      const time: number = new Date().getTime();
      const angle: number = lastSpinnerData
        ? (lastSpinnerData.angle +
            ((time - lastSpinnerData.time) / intervalDuration) *
              angleIncrement) %
          360
        : 0;
      return { time, angle } as SpinnerData;
    };
    const [, dispatchSpin] = useReducer((lastSpinnerData: SpinnerData) => {
      const updatedSpinnerData: SpinnerData = getSpinnerData(lastSpinnerData);
      if (spinnerRef.current)
        spinnerRef.current.style.transform =
          `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) ` +
          `rotateZ(${updatedSpinnerData.angle}deg) skew(0deg, 0deg)`;
      return updatedSpinnerData;
    }, getSpinnerData());
    useEffect(() => {
      const renderInterval: NodeJS.Timeout = setInterval(
        () => dispatchSpin(),
        intervalDuration
      );
      return () => clearInterval(renderInterval);
    }, [intervalDuration]);
    return <SpinnerContent img={img} spinnerRef={spinnerRef} />;
  }
);

export default Spinner;
