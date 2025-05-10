import { BoardTile, CardInstance, GameState, Player } from '../state';

// TODO: put this somewhere better
export type OccupiedTile = BoardTile & { card: CardInstance; controllerPlayerId: Player['id'] };

export function* allBoardCards(state: GameState, destroyedTile?: OccupiedTile | null) {
  // first yield the destroyed tile, if there is one
  if (destroyedTile) yield destroyedTile;
  // then iterate over all cards on the board
  for (let tile of allBoardTiles(state)) {
    if (tile.card) yield tile as OccupiedTile;
  }
}

export function* allBoardTiles(state: GameState) {
  for (const row of state.board) {
    for (const cell of row) {
      yield cell;
    }
  }
}
