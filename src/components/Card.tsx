import { Card as ICard } from '@/gameplay/state/Card/Card';

const Card = (card: ICard) => {
  return (
    <div>
      <p> name: { card.name } </p>
      <p> power: { card.power } </p>
      <p> cost: { card.playRequirement } </p>
    </div>
  );
}

export default Card;
