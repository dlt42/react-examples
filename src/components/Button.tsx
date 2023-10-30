import { FC, MouseEvent } from 'react';

type ButtonProps = {
  title?: string;
  children: string | JSX.Element;
  onClick: (e: MouseEvent) => void;
};

const Button: FC<ButtonProps> = (props): JSX.Element => {
  const { children, title, onClick } = props;
  return (
    <div className='flex flex-row justify-center gap-1 text-center'>
      <button
        title={title ?? undefined}
        className='cursor-pointer whitespace-nowrap border-2 border-solid border-gray-800 bg-gray-200 p-1 text-base font-normal hover:bg-gray-800 hover:text-gray-200'
        onClick={(e) => {
          onClick(e);
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
