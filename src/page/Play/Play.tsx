import { useGameplayStore } from '@/gameplay/store';
import PlayerSetup from './PlayerSetup/PlayerSetup';
import GamePhase from './GamePhase/GamePhase';

const Play = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  if (gameState) {
    return <GamePhase />;
  }
  return <PlayerSetup />;
};

export default Play;
