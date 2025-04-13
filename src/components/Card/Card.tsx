import { Card as ICard, getGridForCard, getCardHasSpecialEffect } from '@/gameplay/state/Card/Card';
import CardGrid from './CardGrid';

const Card = (card: ICard) => {
  return (
    <div className="w-full border rounded-md">
      <div className="flex justify-between">
        <span> <CardCost cost={card.playRequirement} /> </span>
        <span> { card.power } </span>
      </div>
      <div>
        <CardGrid grid={getGridForCard(card)} />
      </div>
      <div> { getCardHasSpecialEffect(card) ? "*" : null } { card.name } </div>
    </div>
  );
}

interface CardCostProps {
  cost: ICard['playRequirement'];
};
const CardCost = ({ cost }: CardCostProps) => {
  if (cost === 'replace') {
    return 'R';
  }
  return Array.from({ length: cost }).map(() => 'i').join(' ');
}

export default Card;
