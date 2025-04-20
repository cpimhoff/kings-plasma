import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface Props {
  enabled?: boolean;
  count: number;
  maxCount?: number;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const SelectableCardWrapper = ({
  enabled = true,
  count,
  maxCount,
  onHoverIn,
  onHoverOut,
  onClick,
  className,
  children,
}: Props) => {
  const countInfo = typeof maxCount !== 'undefined' ? `${count}/${maxCount}` : `x${count}`;
  return (
    <div
      className={cn('flex flex-col p-2 hover:cursor-pointer hover:bg-slate-100', className)}
      onClick={() => enabled && onClick()}
      onMouseOver={onHoverIn}
      onMouseOut={onHoverOut}
    >
      <div className="flex grow flex-col">{children}</div>
      <div className="flex justify-center">
        <span className="mt-1 w-10 rounded-md border border-2 text-center">{countInfo}</span>
      </div>
    </div>
  );
};

export default SelectableCardWrapper;
