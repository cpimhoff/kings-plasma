import { cn } from '@/utils/cn';
import { useMemo, useCallback } from 'react';
import { useGameplayStore } from '@/gameplay/store';
import { useMulliganStore } from './mulliganStore';
import { useInteractionStore } from './interactionStore';
import { useShallow } from 'zustand/react/shallow';

import { Card as ICard } from '@/gameplay/state/Card';
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
  idx: number,
  card: ICard,
  color: string,
}
const HandCard = ({ idx, card, color }: Props) => {
  const {
    handIndexesToMulligan,
    toggleHandIndexToMulligan,
  } = useMulliganStore(useShallow((state) => ({
    handIndexesToMulligan: state.handIndexesToMulligan,
    toggleHandIndexToMulligan: state.toggleHandIndexToMulligan,
  })));

  const {
    hoveredHandIndex,
    selectedHandIndex,
    hoverOverHandIndex,
    clickHandIndex,
    resetHover,
  } = useInteractionStore(useShallow((state) => ({
    hoveredHandIndex: state.hoveredHandIndex,
    selectedHandIndex: state.selectedHandIndex,
    hoverOverHandIndex: state.hoverOverHandIndex,
    clickHandIndex: state.clickHandIndex,
    resetHover: state.resetHover,
  })));

  const isMulligan = useMemo(() => handIndexesToMulligan.includes(idx), [idx, handIndexesToMulligan]);
  const isHovered = useMemo(() => idx === hoveredHandIndex, [idx, hoveredHandIndex]);
  const isSelected = useMemo(() => idx === selectedHandIndex, [idx, selectedHandIndex]);

  const { gameState, clearPreview } = useGameplayStore(useShallow((state) => ({
    gameState: state.gameState,
    clearPreview: state.clearPreview,
  })));

  const { phase } = gameState!;

  const handleClick = useCallback<(idx: number) => void>((idx) => {
    if (phase === 'setup') {
      toggleHandIndexToMulligan(idx);
    } else {
      clickHandIndex(idx);
      clearPreview();
    }
  }, [phase]);

  return (
    <div
      className={cn('flex-shrink-0 w-50 h-70 flex flex-col items-center', {
        'border border-3': true,
        'border-orange-400': isMulligan,
        'border-sky-300': isHovered && !isSelected,
        'border-red-600': isSelected,
      })}
      onMouseEnter={() => hoverOverHandIndex(idx)}
      onMouseLeave={() => resetHover()}
      onClick={() => handleClick(idx)}
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
          <CardEffectPreviewGrid {...card} />
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
};

export default HandCard;
