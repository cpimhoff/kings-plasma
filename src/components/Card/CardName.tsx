import { Card as ICard } from '@/gameplay/state/Card/Card';

type Props = Pick<ICard, 'name'>;
const CardName = ({ name }: Props) => {
  return (
    <div>
      { name }
    </div>
  );
};

export default CardName;

