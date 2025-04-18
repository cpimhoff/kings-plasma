import { ReactNode } from 'react';

interface Props {
  gameStatus: ReactNode;
  gameBoard: ReactNode;
  boardControls: ReactNode;
  playerHand: ReactNode;
}
const BoardView = ({
  gameStatus,
  gameBoard,
  boardControls,
  playerHand,
}: Props) => {
  return (
    <div>
      { gameStatus }
      <div>
        { gameBoard }
        <div>
          {/* todo: render a preview card here? */}
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        { playerHand }
        <div className="ml-3">
          { boardControls }
        </div>
      </div>
    </div>
  );
};

export default BoardView;
