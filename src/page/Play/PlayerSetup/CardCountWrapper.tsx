import { cn } from '@/utils/cn';
import { memo, ReactNode } from 'react';

interface Props {
  count: number;
  maxCount?: number;
  className?: string;
  children: ReactNode;
}

const CardCountWrapper = memo(({ count, maxCount, className, children }: Props) => {
  const countInfo = typeof maxCount !== 'undefined' ? `${count}/${maxCount}` : `x${count}`;
  return (
    <div className={cn('flex grow flex-col', className)}>
      <div className="flex grow flex-col">{children}</div>
      <div className="flex justify-center">
        <span className="mt-1 w-10 rounded-md border border-2 text-center">{countInfo}</span>
      </div>
    </div>
  );
});

export default CardCountWrapper;
