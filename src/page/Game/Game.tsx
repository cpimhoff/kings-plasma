import { useGameplayStore } from '@/gameplay/store';
import PlayerSetup from '@/page/Game/PlayerSetup/PlayerSetup';
import BoardView from '@/page/Game/BoardView';

const Play = () => {
  const gameState = useGameplayStore(state => state.gameState);
  if (gameState) {
    return <BoardView />;
  }
  return <PlayerSetup />;
};

export default Play;
