import { ReactNode } from 'react';

interface Props {
  enabled?: boolean;
  count: number;
  onHover?: () => void;
  onClick: () => void;
  children: ReactNode;
};

const SelectableCardWrapper = ({
  enabled = true,
  count,
  onHover,
  onClick,
  children,
}: Props) => {
  return (
    <div
      className="min-w-30 m-4 hover:bg-slate-200 hover:cursor-pointer"
      onClick={() => enabled && onClick()}
      onMouseOver={onHover}
    >
      { children }
      <div className="flex justify-end">
        <span className="mr-2">
          { `x${count}` }
        </span>
      </div>
    </div>
  );
};

export default SelectableCardWrapper;
