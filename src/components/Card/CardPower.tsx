import { cn } from '@/utils/cn';
import { Card as ICard } from '@/gameplay/state/Card/Card';

interface Props {
  power: ICard['power'];
  nerfed: boolean;
  buffed: boolean;
}
const classes = "border border-3 rounded-full w-full h-full flex justify-center items-center bg-slate-700 font-bold";
const CardPower = ({ power, nerfed, buffed }: Props) => {
  const highlight = nerfed || buffed;
  return (
    <div className={cn(classes, {
      'text-yellow-500': !highlight,
      'border-yellow-500': !highlight,
      'text-red-500': nerfed,
      'border-red-500': nerfed,
      'text-green-500': buffed,
      'border-green-500': buffed,
    })}>
      { power }
    </div>
  );
}

export default CardPower;
