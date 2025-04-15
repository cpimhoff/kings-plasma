import BoardTile from './BoardTile';
import RowScoreTile from './RowScoreTile';
import { useGameplayStore } from '@/gameplay/store';
import { Player } from '@/gameplay/state/Player';
import { adaptGameState } from './adapter';

const GameBoard = () => {
  const gameState = useGameplayStore((state) => state.gameState);
  const state = gameState!;
  const {
    players,
    playPhaseActivePlayerId: playerId,
  } = state!;

  // rotate the board 180deg for the trailing player
  // (tile position data remains unchanged)
  const { board: trueBoard } = state!;
  const isTrailingPlayer = players.map(p => p.id).indexOf(playerId) === 1;
  const board = isTrailingPlayer ?
    [...trueBoard.map(column => [...column].reverse())].reverse()
    : trueBoard;

  const playColumns = board.map((column) => (
    column.map((tile) => (
      <BoardTile
        key={`${tile.position.x},${tile.position.y}`}
        tile={tile}
      />
    ))));

  const { rowScoresByPlayerId } = adaptGameState(state);

  const scoreColumns = [...players]
    .sort(p => ((p.id === playerId) ? -1 : 1))
    .map((player) => (
      buildScoreColumnForPlayer(player.id, rowScoresByPlayerId[player.id])
    ));

  const columns = [scoreColumns[0], ...playColumns, scoreColumns[1]];
  const tiles = columns.reduce((accum, curr) => [...accum, ...curr], []);

  return (
    <div className="grid grid-flow-col grid-cols-7 grid-rows-3 w-[60rem] gap-5">
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
