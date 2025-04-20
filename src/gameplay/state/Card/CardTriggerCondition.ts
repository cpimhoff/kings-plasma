import { Vector2 } from "@/utils/vector";

export type CardTriggerCondition =
  | CardTriggerCondition.OnPlay
  | CardTriggerCondition.OnDeath
  | CardTriggerCondition.OnPowerChange
  | CardTriggerCondition.MatchBoardState;

export namespace CardTriggerCondition {
  /** Triggers once for each time a card is played to the board. */
  export type OnPlay = {
    id: "onPlay";
    // if true, trigger when this card is played
    self?: boolean;
    // if true, trigger when an allied card is played
    allied?: boolean;
    // if true, trigger when an opponent card is played
    opponent?: boolean;
    // if set, only trigger when a card is played in these relative tiles
    tiles?: Vector2[];
  };

  /** Triggers once for each time a card is destroyed. */
  export type OnDeath = {
    id: "onDestroy";
    // if true, trigger on destruction of self
    self?: boolean;
    // if true, trigger on destruction of allied cards
    allied?: boolean;
    // if true, trigger on destruction of opponent cards
    opponent?: boolean;
    // if set, only trigger on destruction of cards in these relative tiles
    tiles?: Vector2[];
  };

  /** Triggers once for each time the power of a card changes. */
  export type OnPowerChange = {
    id: "onPowerChange";
    // if true, trigger on power changes to self
    self?: boolean;
    // if true, trigger on power changes to allied cards
    allied?: boolean;
    // if true, trigger on power changes to opponent cards
    opponent?: boolean;
    // if set, only trigger on power changes in this direction
    changeDirection?: "increasing" | "decreasing";
    // if set, only trigger when power changes on cards in these relative tiles
    tiles?: Vector2[];
  };

  /** A special trigger which runs the associated action(s) once per matching
   * card on the board. Once run for a given matched card, will not run again
   * for the same matched card. */
  export type MatchBoardState = {
    id: "matchBoardState";
    // if true, match this card
    self?: boolean;
    // if true, match allied cards
    allied?: boolean;
    // if true, match opponent cards
    opponent?: boolean;
    // if set, only match cards in these relative tiles
    tiles?: Vector2[];
    // if set, only match cards with their current power relative to their base power
    relativePower?: "increased" | "decreased" | "base";
  };
}
