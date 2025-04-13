import { useGameplayStore } from '@/gameplay/store';
import DeckSelection from '@/page/Game/DeckSelection/DeckSelection';
import BoardView from '@/page/Game/BoardView';

const Play = () => {
  const gameState = useGameplayStore(state => state.gameState);
  if (gameState) {
    return <BoardView />;
  }
  return <DeckSelection />;
};

export default Play;
