import { useEffect, useRef } from 'react';

import ZoomableSunburstController from './ZoomableSunburstController';

export const ZoomableSunburstChart2 = ({ data, width, height }) => {
  const ref = useRef();
  useEffect(() => {
    const controller = new ZoomableSunburstController(data, width, height, ref);
    return () => {
      controller.cleanup();
    };
  }, [data, height, width]);
  return <svg className='Sunburst2' ref={ref} />;
};

export default ZoomableSunburstChart2;
