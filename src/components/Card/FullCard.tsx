import { cn } from '@/utils/cn';
import { useMemo } from 'react';
import { CardDefinition } from '@/gameplay/state';
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
  card: CardDefinition;
  color: string;
}
const FullCard = ({ card, color }: Props) => {
  const effectPreviewGrid = useMemo(() => <CardEffectPreviewGrid effects={card.effects} />, [card.effects]);
  return (
    <div
      className={cn('flex h-70 w-50 flex-col items-center', {
        'border border-3': true,
      })}
    >
      <CardGradient color={color} className="flex w-full flex-col items-center">
        <div className="mb-3 w-full">
          <div className="mx-4 mt-2 flex justify-between">
            <CardCost {...card} />
            <div className="h-8 w-8">
              <CardPower {...card} />
            </div>
          </div>
        </div>
        <div className="w-1/2">{effectPreviewGrid}</div>
      </CardGradient>
      <CardFooter className="flex w-full grow flex-col items-center justify-stretch">
        <div className="mb-3 flex justify-center">
          <CardName {...card} />
        </div>
        <div className="flex h-full items-center">
          <CardSpecialEffectDescription {...card} />
        </div>
      </CardFooter>
    </div>
  );
};

export default FullCard;
