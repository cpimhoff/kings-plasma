import BoardView from './BoardView';
import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import Results from './Results';
import GameStatus from './GameStatus';
import { useGameplayStore } from '@/gameplay/store' ;

const EndPhase = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { players } = gameState!;
  const player = players.find((player) => !player.phase.end.requestRematch)!;
  return (
    <>
      <BoardView
        gameStatus={(
          <>
            <GameStatus player={player} />
            <Results />
          </>
        )}
        gameBoard={<GameBoard />}
        boardControls={<BoardControls player={player} />}
        playerHand={<PlayerHand player={player} />}
      />
    </>
  );
};

export default EndPhase;
