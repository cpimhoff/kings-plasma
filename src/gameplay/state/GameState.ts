import { produce } from "immer";
import { Phase } from "./Phase";
import { Board, createBoard } from "./Board";
import { Player } from "./Player";
import { StableRandom, StableRandomState } from "@/utils/random";
import { processGameStart } from "../process/processGameStart";

export type GameState = {
  phase: Phase;
  players: Player[];
  playPhaseActivePlayerId: Player["id"];
  board: Board;
  rng: StableRandomState;
};

export function resetGameState(oldGameState: GameState): GameState {
  const { players } = oldGameState;
  return createInitialState(players);
}

export function createInitialState(players: Player[]): GameState {
  const board = createBoard(
    { width: 5, height: 3 },
    { leading: players[0].id, trailing: players[1].id },
  );
  const state: GameState = {
    phase: "setup",
    players,
    playPhaseActivePlayerId: players[0].id,
    board,
    rng: StableRandom.init(),
  };
  return produce(state, (draft) => processGameStart(draft));
}
