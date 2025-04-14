import GameBoard from './GameBoard';
import BoardControls from './BoardControls';
import PlayerHand from './PlayerHand';

const BoardView = () => {
  return (
    <div>
      <GameBoard />
      <BoardControls />
      <PlayerHand />
    </div>
  );
};

export default BoardView;
