export type ContainerProps = {
  children: JSX.Element | JSX.Element[];
  id?: string;
  classes?: string;
  border?: boolean;
  padding?: boolean;
  direction?: 'row' | 'column';
};
