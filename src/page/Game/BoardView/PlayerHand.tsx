import { useGameplayStore } from '@/gameplay/store' ;
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import HandCard from './HandCard';

const PlayerHand = () => {
  const { gameState } = useGameplayStore();
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

  const { hand } = getPlayerWithId(players, playerId);

  const {
    selectedHandIndexes,
    clickHandIndex,
  } = useSelectionStore(useShallow((state) => ({
    selectedHandIndexes: state.selectedHandIndexes,
    clickHandIndex: state.clickHandIndex,
  })));

  return (
    <div>
      <div className="flex">
        { hand.map((card, idx) => (
          <div
            key={`${playerId},${card.id},${idx}`}
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
