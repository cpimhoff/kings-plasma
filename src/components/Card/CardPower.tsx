import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'power'>;
const CardPower = ({ power }: Props) => {
  return (
    <div className="border border-yellow-500 border-3 rounded-full w-full h-full flex justify-center items-center text-yellow-500 bg-slate-700 font-bold">
      { power }
    </div>
  );
}

export default CardPower;
