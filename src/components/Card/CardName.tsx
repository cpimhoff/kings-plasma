import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'name'>;
const CardName = ({ name }: Props) => {
  return (
    <div className="text-center font-bold">
      { name }
    </div>
  );
};

export default CardName;

