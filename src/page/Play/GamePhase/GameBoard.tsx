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
    // playPhaseActivePlayerId: playerId, // see below
  } = state!;

  // rotate the board 180deg for the trailing player
  // (tile position data remains unchanged)
  const { board: trueBoard } = state!;
  // const isTrailingPlayer = players.map(p => p.id).indexOf(playerId) === 1;
  // TODO: uncomment when inverting the card preview grids is implemented
  const isTrailingPlayer = false;
  const board = isTrailingPlayer ?
    [...trueBoard.map(column => [...column].reverse())].reverse()
    : trueBoard;

  const playColumns = board.map((column, c) => (
    column.map((tile, r) => (
      <div
        key={`${tile.position.x},${tile.position.y}`}
        className={(c * 5 + r ) % 2 === 1 ? "bg-slate-500" : "bg-slate-100" }
      >
        <BoardTile
          position={tile.position}
        />
      </div>
    ))));

  const { rowScoresByPlayerId } = adaptGameState(state);

  const scoreColumns = [...players]
    // .sort(p => ((p.id === playerId) ? -1 : 1))
    // ^TODO: bring this back if we decide to flip the board for player 2
    .map((player) => (
      buildScoreColumnForPlayer(player.id, rowScoresByPlayerId[player.id])
    ));

  const columns = [scoreColumns[0], ...playColumns, scoreColumns[1]];
  const tiles = columns.reduce((accum, curr) => [...accum, ...curr], []);

  return (
    <div className="grid grid-flow-col grid-cols-7 grid-rows-3 w-[60rem] h-[30rem] border border-px border-black">
      { tiles }
    </div>
  );
};

function buildScoreColumnForPlayer(
  playerId: Player['id'],
  rowScores: number[],
) {
  return Array.from({ length: 3 }).map((_, i) => (
    <div key={`${playerId},${i}`} className="bg-slate-500">
      <RowScoreTile score={rowScores[i]}/>
    </div>
  ));
}

export default GameBoard;
