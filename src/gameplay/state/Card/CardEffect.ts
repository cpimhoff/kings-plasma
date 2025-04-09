import { CardAction } from "./CardAction";
import { CardTriggerCondition } from "./CardTriggerCondition";

export type CardEffect =
  | { trigger: CardTriggerCondition; actions: CardAction[] }
  | { passive: CardAction[] };
