import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface Props {
  enabled?: boolean;
  count: number;
  onHover?: () => void;
  onClick: () => void;
  className?: string;
  children: ReactNode;
};

const SelectableCardWrapper = ({
  enabled = true,
  count,
  onHover,
  onClick,
  className,
  children,
}: Props) => {
  return (
    <div
      className={cn("flex flex-col hover:bg-slate-200 hover:cursor-pointer", className)}
      onClick={() => enabled && onClick()}
      onMouseOver={onHover}
    >
      <div className="flex flex-col grow">
        { children }
      </div>
      <div className="flex justify-end">
        <span className="mr-2">
          { `x${count}` }
        </span>
      </div>
    </div>
  );
};

export default SelectableCardWrapper;
