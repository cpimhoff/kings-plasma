import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import BoardView from './BoardView';
import { useGameplayStore } from '@/gameplay/store' ;
import { getPlayerWithId } from '@/gameplay/state/Player';

const PlayPhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { players, playPhaseActivePlayerId } = gameState!;
  const activePlayerId = playPhaseActivePlayerId;
  const player = getPlayerWithId(players, activePlayerId);
  return (
    <BoardView
      gameStatus={<GameStatus player={player} />}
      gameBoard={<GameBoard />}
      boardControls={<BoardControls player={player} />}
      playerHand={<PlayerHand player={player} />}
    />
  );
};

export default PlayPhase;

