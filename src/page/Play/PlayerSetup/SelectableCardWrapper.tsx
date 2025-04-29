import { cn } from '@/utils/cn';
import { memo, ReactNode } from 'react';

interface Props {
  enabled?: boolean;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const SelectableCardWrapper = memo(({ enabled = true, onHoverIn, onHoverOut, onClick, className, children }: Props) => {
  return (
    <div
      className={cn('flex flex-col p-2 hover:cursor-pointer hover:bg-slate-100', className)}
      onClick={() => enabled && onClick()}
      onMouseOver={onHoverIn}
      onMouseOut={onHoverOut}
    >
      {children}
    </div>
  );
});

export default SelectableCardWrapper;
