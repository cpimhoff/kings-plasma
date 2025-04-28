import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import BoardView from './BoardView';
import { useGameplayStore } from './GameplayStore';

const SetupPhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { players } = gameState!;
  const player = players.find((player) => !player.phase.setup.done)!;
  return (
    <BoardView
      gameStatus={<GameStatus player={player} />}
      gameBoard={<GameBoard />}
      boardControls={<BoardControls player={player} />}
      playerHand={<PlayerHand player={player} />}
    />
  );
};

export default SetupPhase;
