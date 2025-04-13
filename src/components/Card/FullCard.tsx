import { Card as ICard } from '@/gameplay/state/Card/Card';
import { CardCost, CardPower, CardEffectPreviewGrid, CardSpecialEffectMarker, CardName } from '.';

const Card = (card: ICard) => {
  return (
    <div className="w-full border rounded-md">
      <div className="flex justify-between">
        <CardCost {...card} />
        <CardPower {...card} />
      </div>
      <div>
        <CardEffectPreviewGrid {...card} />
      </div>
      <div> <CardSpecialEffectMarker {...card} /> <CardName {...card} /> </div>
    </div>
  );
}


export default Card;
