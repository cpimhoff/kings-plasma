import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import Results from './Results';
import { useGameplayStore } from '@/gameplay/store' ;
import { getPlayerWithId } from '@/gameplay/state/Player';

const BoardView = () => {
  const { gameState } = useGameplayStore();
  const { phase, players, playPhaseActivePlayerId: playerId } = gameState!;
  return (
    <div>
      { phase === 'play' && (
        <div>
          current player: { getPlayerWithId(players, playerId).name }
        </div>
      ) }
      <GameBoard />
      { ['setup', 'play'].includes(phase) && <BoardControls /> }
      <PlayerHand />
      { phase === 'end' && <Results /> }
    </div>
  );
};

export default BoardView;
