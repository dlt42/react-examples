import { MouseEvent } from 'react';

export type ButtonProps = {
  title?: string;
  children: string | JSX.Element;
  className?: string;
  onClick: (e: MouseEvent) => void;
};
