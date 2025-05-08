import { CardPowerStatus } from "./Card";
import { CardEffectFilters } from "./CardEffectFilters";

export type CardTriggerCondition =
  | CardTriggerCondition.OnPlay
  | CardTriggerCondition.OnDeath
  | CardTriggerCondition.OnPowerChange;

export namespace CardTriggerCondition {
  /** Triggers once for each time a card is played to the board. */
  export type OnPlay = CardEffectFilters & {
    id: 'onPlay';
  };

  /** Triggers once for each time a card is destroyed. */
  export type OnDeath = CardEffectFilters & {
    id: 'onDestroy';
  };

  /** Triggers once for each time the power of a card changes. */
  export type OnPowerChange = CardEffectFilters & {
    id: 'onPowerChange';
    // if set, only trigger on power changes in this direction
    changeDirection?: 'increasing' | 'decreasing';
    // if set, only trigger when the card changes its buffed/debuffed status accordingly
    powerStatusChange?: {
      // what status do we care about
      status: CardPowerStatus;
      // do we care about the status triggering on or triggering off
      onOff: 'on' | 'off';
      // e.g.: 'on' + 'enfeebled' = card goes from being neutral/empowered to being enfeebled
    },
  };
}
