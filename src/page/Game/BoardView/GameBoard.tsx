import { cn } from '@/utils/cn';
import BoardTile from './BoardTile';
import RowScoreTile from './RowScoreTile';
import { BoardPosition } from '@/gameplay/state/Board';
import { useGameplayStore } from '@/gameplay/store';
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { Player } from '@/gameplay/state/Player';
import { adaptGameState } from './adapter';

const GameBoard = () => {
  const { gameState } = useGameplayStore();
  const state = gameState!;
  const { board } = state!;
  const {
    selectedBoardPosition,
    clickBoardPosition,
  } = useSelectionStore(useShallow((state) => ({
    selectedBoardPosition: state.selectedBoardPosition,
    clickBoardPosition: state.clickBoardPosition,
  })));
  const positionsEqual = (pos1: BoardPosition, pos2: BoardPosition) => (
    pos1.x === pos2.x && pos1.y === pos2.y
  );
  const playColumns = board.map((column) => (
    column.map((tile) => (
      <div
        className={cn({
          'bg-sky-200': selectedBoardPosition && positionsEqual(tile.position, selectedBoardPosition),
        })}
        onClick={() => clickBoardPosition(tile.position)}
      >
        <BoardTile {...tile} />
      </div>
    ))));
  const { rowScoresByPlayerIdx } = adaptGameState(state);
  const { players } = state;
  const scoreColumns = players.map((player) => (
    buildScoreColumnForPlayer(player.id, rowScoresByPlayerIdx[player.id])
  ));
  const columns = [scoreColumns[0], ...playColumns, scoreColumns[1]];
  const tiles = columns.reduce((accum, curr) => [...accum, ...curr], []);
  return (
    <div className="grid grid-flow-col grid-cols-7 grid-rows-3">
      { tiles }
    </div>
  );
};

function buildScoreColumnForPlayer(
  playerId: Player['id'],
  rowScores: number[],
) {
  return Array.from({ length: 3 }).map((_, i) => (
    <RowScoreTile key={`${playerId},${i}`} score={rowScores[i]}/>
  ));
}

export default GameBoard;
