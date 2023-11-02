import { MouseEvent } from 'react';

export type ButtonProps = {
  title?: string;
  children: string | JSX.Element;
  onClick: (e: MouseEvent) => void;
};
