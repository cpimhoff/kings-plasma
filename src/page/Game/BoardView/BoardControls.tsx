import { useCallback } from 'react';
import { useGameplayStore } from '@/gameplay/store' ;
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';

const Controls = () => {
  const { gameState, dispatchAction } = useGameplayStore();

  const {
    phase,
    players,
    playPhaseActivePlayerId,
  } = gameState!;

  let playerId;
  if (phase === 'setup') {
    playerId = players
    .find((player) => !player.phase.setup.done)!.id;
  } else {
    playerId = playPhaseActivePlayerId;
  }

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
      playerId,
      handIndexes: selectedHandIndexes,
    });
    reset();
  }, [playerId, selectedHandIndexes]);

  const onPlayCard = useCallback(() => {
    if (!selectedBoardPosition) return;
    dispatchAction({
      type: 'playCard',
      playerId,
      fromHandIndex: selectedHandIndexes[0],
      toBoardPosition: selectedBoardPosition!,
    });
    reset();
  }, [selectedBoardPosition, selectedHandIndexes]);

  const onPass = useCallback(() => {
    dispatchAction({
      type: 'pass',
      playerId,
    });
    reset();
  }, [playerId]);

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
