import { Card } from "./Card";
import { Player } from "./Player";

export type Board = Array<Array<BoardTile>>;

/** Board coordinates are 0-indexed, starting at the bottom left corner, columns first. */

export type BoardPosition = {
  x: number;
  y: number;
};

export type BoardTile = {
  position: BoardPosition;
  pips: number;
  card: Card | null;
  controllerPlayerId: Player["id"] | null;
};

export function createBoard(
  dimensions: { width: number; height: number },
  players?: { leading: Player["id"]; trailing: Player["id"] },
): Board {
  // make the empty board
  const board: Board = Array.from({ length: dimensions.width }, (_, x) =>
    Array.from({ length: dimensions.height }, (_, y) => {
      return {
        position: { x, y },
        card: null,
        pips: 0,
        controllerPlayerId: null,
      };
    }),
  );

  // assign player starting positions
  if (!players) return board;
  board[0].forEach((tile) => {
    tile.controllerPlayerId = players.leading;
    tile.pips = 1;
  });
  board[dimensions.width - 1].forEach((tile) => {
    tile.controllerPlayerId = players.trailing;
    tile.pips = 1;
  });
  return board;
}
