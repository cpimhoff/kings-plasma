import { cn } from '@/utils/cn';
import { useMemo, useCallback } from 'react';
import { useGameplayStore } from './GameplayStore';
import { useMulliganStore } from './MulliganStore';
import { useInteractionStore } from './InteractionStore';
import { useShallow } from 'zustand/react/shallow';

import { CardDefinition as ICard } from '@/gameplay/state/Card';
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
  idx: number;
  card: ICard;
  color: string;
  locked?: boolean;
}
const HandCard = ({ idx, card, color, locked }: Props) => {
  const { handIndexesToMulligan, toggleHandIndexToMulligan } = useMulliganStore(
    useShallow((state) => ({
      handIndexesToMulligan: state.handIndexesToMulligan,
      toggleHandIndexToMulligan: state.toggleHandIndexToMulligan,
    })),
  );

  const { hoveredHandIndex, selectedHandIndex, hoverOverHandIndex, clickHandIndex, resetHover } = useInteractionStore(
    useShallow((state) => ({
      hoveredHandIndex: state.hoveredHandIndex,
      selectedHandIndex: state.selectedHandIndex,
      hoverOverHandIndex: state.hoverOverHandIndex,
      clickHandIndex: state.clickHandIndex,
      resetHover: state.resetHover,
    })),
  );

  const isMulligan = useMemo(() => handIndexesToMulligan.includes(idx), [idx, handIndexesToMulligan]);
  const isHovered = useMemo(() => idx === hoveredHandIndex, [idx, hoveredHandIndex]);
  const isSelected = useMemo(() => idx === selectedHandIndex, [idx, selectedHandIndex]);

  const { gameState, clearPreview } = useGameplayStore(
    useShallow((state) => ({
      gameState: state.gameState,
      clearPreview: state.clearPreview,
    })),
  );

  const { phase } = gameState!;

  const handleHover = useCallback<(idx: number) => void>((idx) => {
    if (locked) return;
    hoverOverHandIndex(idx);
  }, [locked]);

  const handleClick = useCallback<(idx: number) => void>(
    (idx) => {
      if (locked) return;
      if (phase === 'setup') {
        toggleHandIndexToMulligan(idx);
      } else {
        clickHandIndex(idx);
        clearPreview();
      }
    },
    [locked, phase],
  );

  return (
    <div
      className={cn('flex h-70 w-50 flex-shrink-0 flex-col items-center', {
        'border border-3': true,
        'border-orange-400': isMulligan,
        'border-sky-300': isHovered && !isSelected,
        'border-red-600': isSelected,
      })}
      onMouseEnter={() => handleHover(idx)}
      onMouseLeave={() => resetHover()}
      onClick={() => handleClick(idx)}
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
        <div className="w-1/2">
          <CardEffectPreviewGrid {...card} />
        </div>
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

export default HandCard;
