import { FC } from 'react';

import { ContainerProps } from './Container.types';

const Container: FC<ContainerProps> = ({
  children,
  classes,
  id,
  border = true,
  padding = true,
  direction = 'column',
}): JSX.Element =>
  direction === 'column' ? (
    <div
      id={id ?? undefined}
      className={`${
        classes ?? ''
      } flex flex-col items-center justify-between gap-1 ${
        border ? 'border border-solid border-gray-800' : ''
      } ${padding ? `p-1` : ''}`}
    >
      {children}
    </div>
  ) : (
    <div
      id={id ?? undefined}
      className={`${
        classes ?? ''
      } flex flex-row justify-center gap-1 text-center ${
        border ? 'border border-solid border-gray-800' : ''
      } ${padding ? `p-1` : ''}`}
    >
      {children}
    </div>
  );

export default Container;
