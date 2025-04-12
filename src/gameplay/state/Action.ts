import { Card } from "./Card";
import { Phase } from "./Phase";
import { Player } from "./Player";

/** An action represents a single transaction a player can dispatch
 * against the game state. */
export type Action =
  | Action.PlayCard
  | Action.Pass
  | Action.Mulligan
  | Action.DeckReady
  | Action.Rematch;

/** Mapping between phase and actions that can be performed. */
export type PhaseAction<P extends Phase> = {
  deckSelection: Action.DeckReady;
  setup: Action.Mulligan;
  play: Action.PlayCard | Action.Pass;
  end: Action.Rematch;
}[P["type"]];

export namespace Action {
  /** Play a card from the player's hand to the board. */
  export type PlayCard = {
    type: "playCard";
    playerId: Player["id"];
    fromHandIndex: number;
    toBoardPosition: { x: number; y: number };
  };

  /** Pass the turn to the next player. */
  export type Pass = {
    type: "pass";
    playerId: Player["id"];
  };

  /** Mulligan one or more cards. */
  export type Mulligan = {
    type: "mulligan";
    playerId: Player["id"];
    handIndexes: number[];
  };

  /** Signal that the player is ready to begin the game. */
  export type DeckReady = {
    type: "deckReady";
    playerId: Player["id"];
    deck: Card[];
  };

  /** Signal that the player is ready to begin a rematch. */
  export type Rematch = {
    type: "rematch";
    playerId: Player["id"];
  };
}
