import { cn } from '@/utils/cn';
import { useMemo, useCallback } from 'react';
import { useGameplayStore } from '@/gameplay/store';
import { useHoverStore } from './hoverStore';
import { useMulliganStore } from './mulliganStore';
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';

import FullCard from '../PlayerSetup/FullCard'; // TODO either move this or make a new component
import { Card as ICard } from '@/gameplay/state/Card';

interface Props {
  idx: number,
  card: ICard,
}
const HandCard = ({ idx, card }: Props) => {
  const {
    hoveredHandIndex,
    hoverOverHandIndex,
    resetHover,
  } = useHoverStore(useShallow((state) => ({
    hoveredHandIndex: state.hoveredHandIndex,
    hoverOverHandIndex: state.hoverOverHandIndex,
    resetHover: state.resetHover,
  })));

  const {
    toggleHandIndexToMulligan,
  } = useMulliganStore(useShallow((state) => ({
    toggleHandIndexToMulligan: state.toggleHandIndexToMulligan,
  })));

  const {
    selectedHandIndex,
    clickHandIndex,
  } = useSelectionStore(useShallow((state) => ({
    selectedHandIndex: state.selectedHandIndex,
    clickHandIndex: state.clickHandIndex,
  })));

  const isHovered = useMemo(() => idx === hoveredHandIndex, [idx, hoveredHandIndex]);
  const isSelected = useMemo(() => idx === selectedHandIndex, [idx, selectedHandIndex]);

  const { phase } = useGameplayStore((state) => state.gameState)!;

  const handleClick = useCallback<(idx: number) => void>((idx) => {
    if (phase === 'setup') {
      toggleHandIndexToMulligan(idx);
    } else {
      clickHandIndex(idx);
    }
  }, [phase]);

  return (
    <div
      className={cn({
        'w-xs': true,
        'bg-sky-100': isHovered && !isSelected,
        'bg-sky-200': isSelected,
      })}
      onMouseEnter={() => hoverOverHandIndex(idx)}
      onMouseLeave={() => resetHover()}
      onClick={() => handleClick(idx)}
    >
      <FullCard {...card} />
    </div>
  );
};

export default HandCard;
