import { useCallback } from 'react';
import { useGameplayStore } from '@/gameplay/store' ;
import { Player } from '@/gameplay/state/Player' ;
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';

interface Props {
  player: Player;
}

const Controls = ({ player }: Props) => {
  const { gameState, dispatchAction } = useGameplayStore();
  const { phase } = gameState!;

  const {
    selectedHandIndexes,
    selectedBoardPosition,
    reset,
  } = useSelectionStore(useShallow((state) => ({
    selectedHandIndexes: state.selectedHandIndexes,
    selectedBoardPosition: state.selectedBoardPosition,
    reset: state.reset,
  })));

  const onMulligan = useCallback(() => {
    dispatchAction({
      type: 'mulligan',
      playerId: player.id,
      handIndexes: selectedHandIndexes,
    });
    reset();
  }, [player.id, selectedHandIndexes]);

  const onPlayCard = useCallback(() => {
    if (!selectedBoardPosition) return;
    dispatchAction({
      type: 'playCard',
      playerId: player.id,
      fromHandIndex: selectedHandIndexes[0],
      toBoardPosition: selectedBoardPosition!,
    });
    reset();
  }, [selectedBoardPosition, selectedHandIndexes]);

  const onPass = useCallback(() => {
    dispatchAction({
      type: 'pass',
      playerId: player.id,
    });
    reset();
  }, [player.id]);

  return (
    <div>
      { phase === 'setup' && (
        <Button onClick={() => onMulligan()}>
          { selectedHandIndexes.length > 0 ? "Mulligan and begin" : "Begin" }
        </Button>
      ) }
      { phase === 'play' && (
        <>
          <Button disabled={selectedHandIndexes.length === 0} onClick={() => onPlayCard()}>
            Play card
          </Button>
          <Button onClick={() => onPass()}>
            Pass
          </Button>
        </>
      ) }
    </div>
  );
};

export default Controls;
