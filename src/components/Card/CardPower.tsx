import { cn } from '@/utils/cn';
import { CardPowerStatus, CardDefinition } from '@/gameplay/state/Card/Card';

interface Props {
  power: CardDefinition['basePower'];
  powerStatus?: CardPowerStatus;
}
const classes = 'border border-3 rounded-full w-full h-full flex justify-center items-center bg-slate-700 font-bold';
const CardPower = ({ power, powerStatus }: Props) => {
  const highlight = !!powerStatus;
  return (
    <div
      className={cn(classes, {
        'text-yellow-500': !highlight,
        'border-yellow-500': !highlight,
        'text-red-500': powerStatus === 'debuffed',
        'border-red-500': powerStatus === 'debuffed',
        'text-green-500': powerStatus === 'buffed',
        'border-green-500': powerStatus === 'buffed',
      })}
    >
      {power}
    </div>
  );
};

export default CardPower;
