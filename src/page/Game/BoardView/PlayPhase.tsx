import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import { useGameplayStore } from '@/gameplay/store' ;
import { getPlayerWithId } from '@/gameplay/state/Player';

const PlayPhase = () => {
  const { gameState } = useGameplayStore();
  const { players, playPhaseActivePlayerId } = gameState!;
  const activePlayerId = playPhaseActivePlayerId;
  const player = getPlayerWithId(players, activePlayerId);
  return (
    <div>
      <GameStatus player={player}/>
      <GameBoard />
      <BoardControls player={player} />
      <PlayerHand player={player} />
    </div>
  );
};

export default PlayPhase;

