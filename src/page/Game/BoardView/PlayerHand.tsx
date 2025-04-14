import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useGameplayStore } from '@/gameplay/store' ;
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import HandCard from './HandCard';

const PlayerHand = () => {
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

  const player = getPlayerWithId(players, playerId);

  const {
    selectedHandIndexes,
    selectedBoardPosition,
    clickHandIndex,
    reset,
  } = useSelectionStore(useShallow((state) => ({
    selectedHandIndexes: state.selectedHandIndexes,
    selectedBoardPosition: state.selectedBoardPosition,
    clickHandIndex: state.clickHandIndex,
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
  }, []);

  return (
    <div>
      { phase === 'setup' && (
        <Button onClick={() => onMulligan()}>
          { selectedHandIndexes.length > 0 ? "Mulligan and begin" : "Begin" }
        </Button>
      ) }
      { phase === 'play' && (
        <>
          <Button onClick={() => onPlayCard()}>
            Play card
          </Button>
          <Button onClick={() => onPass()}>
            Pass
          </Button>
        </>
      ) }
      <div className="flex">
        { player.hand.map((card, idx) => (
          <div
            key={`${player.id},${card.id},${idx}`}
            className="w-xs"
            onClick={() => clickHandIndex(idx, phase)}
          >
            <HandCard card={card} isSelected={selectedHandIndexes.includes(idx)} />
          </div>
        )) }
      </div>
    </div>
  );
};

export default PlayerHand;
