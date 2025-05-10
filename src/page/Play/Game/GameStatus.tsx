import { useGameplayStore } from './GameplayStore';
import { ControllerPlayerContext } from './ControllerPlayerContext';
import { getPlayerScores, getPlayerWithId } from '@/gameplay';

const GameStatus = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { controllerPlayer: currentPlayer } = useContext(ControllerPlayerContext)!;
  const { phase, players } = gameState!;
  const scores = getPlayerScores(gameState!);
  return (
    <div>
      <p> current phase: {phase} </p>
      <p> current player: {currentPlayer.name} </p>
      <div className="mt-3">
        scores:
        {players.map((player) => {
          return (
            <p key={player.id}>
              {player.name}: {scores.scoreByPlayer[player.id]}
            </p>
          );
        })}
        {phase === 'end' && scores.winningPlayerId && (
          <div className="mt-3">winning player: {getPlayerWithId(players, scores.winningPlayerId).name}</div>
        )}
      </div>
    </div>
  );
};

export default GameStatus;
