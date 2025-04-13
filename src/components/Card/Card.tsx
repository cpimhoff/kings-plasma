import { useMemo } from 'react';
import { Card as ICard, getGridForCard, getCardHasSpecialEffect } from '@/gameplay/state/Card/Card';
import CardGrid from './CardGrid';

const Card = (card: ICard) => {
  const [grid, hasSpecialEffect] = useMemo(() => {
    return [getGridForCard(card), getCardHasSpecialEffect(card)];
  }, [card]);
  return (
    <div className="w-full border rounded-md">
      <div className="flex justify-between">
        <span> <CardCost cost={card.playRequirement} /> </span>
        <span> { card.power } </span>
      </div>
      <div>
        <CardGrid grid={grid} />
      </div>
      <div> { hasSpecialEffect ? "*" : null } { card.name } </div>
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
