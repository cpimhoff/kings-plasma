import { Phase } from "./Phase";
import { Board, createBoard } from "./Board";
import { createPlayer, Player } from "./Player";

export type GameState = {
  phase: Phase;
  players: Player[];
  playPhaseActivePlayerId: Player["id"];
  board: Board;
};

export function createGameState(): GameState {
  const players = [createPlayer("Left"), createPlayer("Right")];
  return {
    phase: "deckSelection",
    players,
    playPhaseActivePlayerId: players[0].id,
    board: createBoard(
      { width: 5, height: 3 },
      { leading: players[0].id, trailing: players[1].id },
    ),
  };
}
