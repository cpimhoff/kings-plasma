import { Phase } from "./Phase";
import { Board, createBoard } from "./Board";
import { Player } from "./Player";
import { StableRandom, StableRandomState } from "@/utils/random";

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
  const rng = StableRandom.init();
  // deal the initial hand for each player
  // todo: shuffle decks
  players.forEach((player) => {
    const initialHand = player.deck.splice(0, 5);
    player.hand = initialHand; // todo: awkward that we have to overwrite these
  });
  const board = createBoard(
    { width: 5, height: 3 },
    { leading: players[0].id, trailing: players[1].id },
  );
  return {
    phase: "setup",
    players,
    playPhaseActivePlayerId: players[0].id,
    board,
    rng,
  };
}
