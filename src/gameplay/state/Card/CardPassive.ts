import { Vector2 } from "@/utils/vector";

export type CardPassive = CardPassive.AdjustBoardPower | CardPassive.PowerBonusFromBoardState;

export namespace CardPassive {
  /** Passively adjust the power of all cards at a given board position. */
  export type AdjustBoardPower = {
    id: "adjustBoardPower";
    // if true, add power to allied cards
    allied?: boolean;
    // if true, add power to opponent cards
    opponent?: boolean;
    // affect these relative tiles
    tiles: Array<Vector2>;
    // the amount of power to add -- can be negative for debuffs
    amount: number;
  };

  /** Passively adjust the power of a card based on how many matching cards
   * are on the board. */
  export type PowerBonusFromBoardState = {
    id: "powerBonusFromBoardState";
    // if true, match this card
    self?: boolean;
    // if true, match allied cards
    allied?: boolean;
    // if true, match opponent cards
    opponent?: boolean;
    // if set, only match cards with their current power relative to their base power
    relativePower?: "enhanced" | "enfeebled" | "base";
    // if set, only match cards in these relative tiles
    tiles?: Array<Vector2>;
    // the amount of power to add for each matching card -- can be negative for debuffs
    amountPerMatch: number;
  };
}
