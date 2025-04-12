import { useGameplayStore } from '@/gameplay/store';
import DeckSelection from '@/page/Game/DeckSelection/DeckSelection';
import BoardView from '@/page/Game/BoardView';

const Play = () => {
  const phase = useGameplayStore(state => state.gameState!.phase);
  if (phase.type === 'deckSelection') {
    return <DeckSelection />;
  }
  return <BoardView />;
};

export default Play;
