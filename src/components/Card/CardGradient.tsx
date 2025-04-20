import { cn } from '@/utils/cn';
import { CSSProperties, ReactNode } from 'react';

interface Props {
  color: string;
  className?: string | undefined;
  children: ReactNode;
}
const CardGradient = ({ color, className, children }: Props) => {
  return (
    <div
      className={cn(className, 'bg-linear-to-t from-gray-700 to-[var(--start-color)]')}
      style={{ '--start-color': color } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default CardGradient;
