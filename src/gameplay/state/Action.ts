import { Player } from './Player';

/** An action represents a single transaction a player can dispatch
 * against the game state. */
export type Action = Action.PlayCard | Action.Pass | Action.Mulligan | Action.Rematch;

export namespace Action {
  /** Play a card from the player's hand to the board. */
  export type PlayCard = {
    type: 'playCard';
    playerId: Player['id'];
    fromHandIndex: number;
    toBoardPosition: { x: number; y: number };
  };

  /** Pass the turn to the next player. */
  export type Pass = {
    type: 'pass';
    playerId: Player['id'];
  };

  /** Mulligan one or more cards. */
  export type Mulligan = {
    type: 'mulligan';
    playerId: Player['id'];
    handIndexes: number[];
  };

  /** Signal that the player is ready to begin a rematch. */
  export type Rematch = {
    type: 'rematch';
    playerId: Player['id'];
    rematch: boolean;
  };
}
