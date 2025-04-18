import { cn } from '@/utils/cn';
import { useMemo } from 'react';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import {
  CardGradient,
  CardCost,
  CardPower,
  CardEffectPreviewGrid,
  CardFooter,
  CardName,
  CardSpecialEffectDescription,
} from '@/components/Card';

interface Props {
  card: ICard;
  color: string;
}
const FullCard = ({ card, color }: Props) => {
  const effectPreviewGrid = useMemo(() => (
    <CardEffectPreviewGrid effects={card.effects} />
  ), [card.effects]);
  return (
    <div
      className={cn('w-50 h-70 flex flex-col items-center', {
        'border border-3': true,
      })}
    >
      <CardGradient color={color} className="w-full flex flex-col items-center">
        <div className="w-full mb-3">
          <div className="flex justify-between mt-2 mx-4">
            <CardCost {...card} />
            <div className="w-8 h-8">
              <CardPower {...card} />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          { effectPreviewGrid }
        </div>
      </CardGradient>
      <CardFooter className="w-full flex grow flex-col justify-stretch items-center">
        <div className="flex justify-center mb-3">
          <CardName {...card} />
        </div>
        <div className="h-full flex items-center">
          <CardSpecialEffectDescription {...card} />
        </div>
      </CardFooter>
    </div>
  );
}

export default FullCard;
