import { useGameplayStore } from '@/gameplay/store';
import GameBoard from './GameBoard';
import PlayerHand from './PlayerHand';

const BoardView = () => {
  const gameState = useGameplayStore();
  return (
    <div>
      <GameBoard />
      <PlayerHand />
      <div> Pass </div>
    </div>
  );
};

export default BoardView;
