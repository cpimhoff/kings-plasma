import { useGameplayStore } from './GameplayStore';
import { ControllerPlayerContext } from './ControllerPlayerContext';

const GameStatus = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const { controllerPlayer: currentPlayer } = useContext(ControllerPlayerContext)!;
  const { phase } = gameState!;
  return (
    <div>
      <p> current phase: {phase} </p>
      <p> current player: {currentPlayer.name} </p>
    </div>
  );
};

export default GameStatus;
