import { Card as ICard } from '@/gameplay/state/Card/Card';
import {
  CardCost,
  CardPower,
  CardEffectPreviewGrid,
  CardSpecialEffectDescription,
  CardName
} from '@/components/Card';

const FullCard = (card: ICard) => {
  return (
    <div className="w-full flex flex-col items-center border rounded-md">
      <div className="w-full flex justify-between">
        <CardCost {...card} />
        <CardPower {...card} />
      </div>
      <div className="w-1/2">
        <CardEffectPreviewGrid {...card} />
      </div>
      <div>
        <CardSpecialEffectDescription {...card} />
      </div>
      <div className="flex justify-center">
        <CardName {...card} />
      </div>
    </div>
  );
}


export default FullCard;
