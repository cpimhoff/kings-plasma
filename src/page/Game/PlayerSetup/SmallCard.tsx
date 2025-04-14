import { Card as ICard } from '@/gameplay/state/Card/Card';
import {
  CardCost,
  CardPower,
  CardEffectPreviewGrid,
  CardSpecialEffectMarker,
  CardName
} from '@/components/Card';

const SmallCard = (card: ICard) => {
  return (
    <div className="w-full flex flex-col items-center border rounded-md">
      <div className="w-full flex justify-between">
        <CardCost {...card} />
        <div className="w-1/4">
          <CardPower {...card} />
        </div>
      </div>
      <div className="w-1/2">
        <CardEffectPreviewGrid {...card} />
      </div>
      <div className="flex justify-center">
        <CardSpecialEffectMarker {...card} />
        <CardName {...card} />
      </div>
    </div>
  );
}


export default SmallCard;
