/**
 * An implementation of the game of life
 *
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import CanvasWrapper, { DrawFunction } from '../../components/CanvasWrapper';
import { LifeTypes } from './LifeAbstract';
import { LifeFastProps } from './LifeEntities';

const LifeFast: FC<LifeFastProps<LifeTypes>> = memo(
  ({
    width,
    height,
    setInitialising,
    lifeStore,
    paused,
    size,
    rendered,
  }): JSX.Element => {
    const [attrs] = useState({ width: width * size, height: height * size });

    // Ref for paused so that it can be evaluated in the callback without it being updatd by paused being toggled
    const isPaused = useRef<boolean>(paused);
    useEffect(() => {
      isPaused.current = paused;
    });
    const draw = useCallback<DrawFunction>(
      (context: CanvasRenderingContext2D) => {
        if (!isPaused.current) {
          lifeStore.process();
        }
        setInitialising(false);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        const incX = context.canvas.width / width;
        const incY = context.canvas.height / height;
        const sizeX = incX * 0.8;
        const sizeY = incY * 0.8;
        lifeStore.renderData.map((elem: LifeTypes, i: number) => {
          context.fillStyle = lifeStore.getBackgroundColor(elem);
          const y = Math.floor(i / width);
          const x = i - y * width;
          context.fillRect(x * incX, y * incY, sizeX, sizeY);
          return elem;
        });
        rendered();
      },
      [rendered, lifeStore, width, height, setInitialising]
    );
    return (
      <div className='FastLife'>
        <CanvasWrapper draw={draw} {...attrs} />
      </div>
    );
  }
);

export default LifeFast;
