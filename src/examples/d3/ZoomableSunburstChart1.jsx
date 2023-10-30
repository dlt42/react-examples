import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import ZoomableSunburstController from './ZoomableSunburstController';

class ChartController extends ZoomableSunburstController {
  constructor(data, width, height, ref) {
    super(data, width, height, ref);
    this.PI2 = 2 * Math.PI;
  }

  _setTarget(found, d, p) {
    d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * this.PI2,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * this.PI2,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth),
    };
  }

  _clickedBack(event, p) {
    this._clicked(event, p);
  }

  _setColor() {
    this.color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, this.data.children.length + 1)
    );
  }

  _setPathFillAndOpacity() {
    this.path
      .attr(`fill`, (d) => {
        while (d.depth > 1) d = d.parent;
        return this.color(d.data.name);
      })
      .attr(`fill-opacity`, (d) => {
        if (d.parent) {
          const siblings = d.parent.children;
          const index = siblings.indexOf(d);
          const percentage = index / siblings.length;
          return (d.children ? 0.9 - 0.3 * percentage : 0.7) - 0.3 * percentage;
        } else {
          return 0.6;
        }
      });
  }
}

export const ZoomableSunburstChart1 = ({ data, width, height }) => {
  const ref = useRef();
  useEffect(() => {
    const controller = new ChartController(data, width, height, ref);
    return () => {
      controller.cleanup();
    };
  }, [data, height, width]);
  return <svg className='Sunburst2' ref={ref} />;
};

export default ZoomableSunburstChart1;
