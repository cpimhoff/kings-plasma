import { Phase } from "./Phase";
import { Board } from "./Board";
import { Player } from "./Player";

export type GameState = {
  phase: Phase;
  players: Player[];
  board: Board;
};
