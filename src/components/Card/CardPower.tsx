import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'power'>;
const CardPower = ({ power }: Props) => {
  return (
    <div className="border rounded-full w-7 flex justify-center">
      { power }
    </div>
  );
}

export default CardPower;
