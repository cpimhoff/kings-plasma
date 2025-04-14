import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';
import Results from './Results';
import { useGameplayStore } from '@/gameplay/store' ;

const BoardView = () => {
  const { gameState } = useGameplayStore();
  const { phase } = gameState!;
  return (
    <div>
      <GameBoard />
      { ['setup', 'play'].includes(phase) && <BoardControls /> }
      <PlayerHand />
      { phase === 'end' && <Results /> }
    </div>
  );
};

export default BoardView;
