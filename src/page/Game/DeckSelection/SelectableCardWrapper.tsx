import { ReactNode } from 'react';

interface Props {
  count: number;
  onHover: () => void;
  onClick: () => void;
  children: ReactNode;
};

const SelectableCardWrapper = ({
  count,
  onHover,
  onClick,
  children,
}: Props) => {
  return (
    <div
      className="min-w-30 m-4 hover:bg-slate-200 hover:cursor-pointer"
      onClick={onClick}
      onMouseOver={onHover}
    >
      { children }
      { `x${count}` }
    </div>
  );
};

export default SelectableCardWrapper;
