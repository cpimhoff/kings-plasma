import { BoardTile, CardDefinition, GameState } from '../state';

// TODO: put this somewhere better
export type ActionSource = BoardTile & { card: CardDefinition };

export function* allBoardCards(state: GameState, destroyedTile?: ActionSource | null) {
  // first yield the destroyed tile, if there is one
  if (destroyedTile) yield destroyedTile;
  // then iterate over all cards on the board
  for (const row of state.board) {
    for (const cell of row) {
      if (cell.card) yield cell as ActionSource;
    }
  }
}
