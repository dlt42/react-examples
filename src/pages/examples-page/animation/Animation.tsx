import { FC } from 'react';

import CanvasWrapper from '../../../components/CanvasWrapper/CanvasWrapper';
import { DrawFunction } from '../../../components/CanvasWrapper/CanvasWrapper.types';
import Container from '../../../components/Container/Container';

const Animation: FC = (): JSX.Element => {
  const draw: DrawFunction = (context, _, frameCount) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = `#000000`;
    context.beginPath();
    context.arc(
      context.canvas.width / 2,
      context.canvas.height / 2,
      20 * Math.sin(frameCount.value * 0.05) ** 2,
      0,
      2 * Math.PI
    );
    context.fill();
  };
  return (
    <>
      <Container>
        <CanvasWrapper draw={draw} width={200} height={200} />
      </Container>
    </>
  );
};

export default Animation;
