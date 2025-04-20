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

  const { board: trueBoard } = state!;
  // reverse each column for rendering with css grid
  const board = [...trueBoard.map((column) => [...column].reverse())];

  const playColumns = board.map((column, c) =>
    column.map((tile, r) => (
      <div
        key={`${tile.position.x},${tile.position.y}`}
        className={(c * 5 + r) % 2 === 1 ? 'bg-slate-500' : 'bg-slate-100'}
      >
        <BoardTile position={tile.position} />
      </div>
    )),
  );

  const { rowScoresByPlayerId } = adaptGameState(state);

  const scoreColumns = [...players].map((player) =>
    buildScoreColumnForPlayer(player.id, rowScoresByPlayerId[player.id]),
  );

  const columns = [scoreColumns[0], ...playColumns, scoreColumns[1]];
  const tiles = columns.reduce((accum, curr) => [...accum, ...curr], []);

  return (
    <div className="border-px grid h-[30rem] w-[60rem] grid-flow-col grid-cols-7 grid-rows-3 border border-black">
      {tiles}
    </div>
  );
};

function buildScoreColumnForPlayer(playerId: Player['id'], rowScores: number[]) {
  return Array.from({ length: 3 }).map((_, i) => (
    <div key={`${playerId},${i}`} className="bg-slate-500">
      <RowScoreTile score={rowScores[i]} />
    </div>
  ));
}

export default GameBoard;
