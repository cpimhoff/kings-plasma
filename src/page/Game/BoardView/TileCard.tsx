import { Card as ICard } from '@/gameplay/state/Card';
import { CardName, CardPower, CardCost } from '@/components/Card';

const TileCard = (card: ICard) => {
  return (
    <div>
      <CardPower {...card} />
      <CardCost {...card} />
      <CardName {...card} />
    </div>
  );
};

export default TileCard;
