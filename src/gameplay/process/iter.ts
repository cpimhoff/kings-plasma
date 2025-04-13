import { BoardTile, Card, GameState } from "../state";

export function* allBoardCards(state: GameState) {
  // first iterate over all cards on the board
  for (const row of state.board) {
    for (const cell of row) {
      if (cell.card) yield cell as BoardTile & { card: Card };
    }
  }
}
