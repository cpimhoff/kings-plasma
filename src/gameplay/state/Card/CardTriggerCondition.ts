import { Vector2 } from "@/utils/vector";

export type CardTriggerCondition =
  | CardTriggerCondition.OnPlay
  | CardTriggerCondition.OnDeath
  | CardTriggerCondition.OnPowerChange;

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
}
