import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface Props {
  className?: string | undefined;
  children: ReactNode;
}
const CardFooter = ({ className, children }: Props) => {
  return <div className={cn(className, 'bg-gray-700 p-3 text-white')}>{children}</div>;
};

export default CardFooter;
