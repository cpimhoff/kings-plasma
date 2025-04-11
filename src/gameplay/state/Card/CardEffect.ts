import { Card } from "./Card";
import { Vector2 } from "@/utils/vector";
import { CardAction } from "./CardAction";
import { CardTriggerCondition } from "./CardTriggerCondition";

export type CardEffect = {
  trigger: CardTriggerCondition;
  actions: CardAction[];
};

/** A collection of functions for easier creation of card effects. */
export namespace CardEffect {
  export function onThisPlayedAddPips(
    tiles: Vector2[],
    amount: number = 1,
  ): CardEffect {
    return onThisPlayed(addPips(tiles, amount));
  }

  export function onThisPlayed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: "onPlay", self: true },
      actions,
    };
  }

  export function onThisDestroyed(...actions: CardAction[]): CardEffect {
    return {
      trigger: { id: "onDestroy", self: true },
      actions,
    };
  }

  export function passiveBoardPowerChange(
    tiles: Vector2[],
    amount: number,
    targets: Pick<CardAction.AddPower, "allied" | "opponent">,
  ): CardEffect[] {
    const addPowerAction = addPower(tiles, amount, targets);
    const removePowerAction = { ...addPowerAction, amount: -amount };

    return [
      // on play this card, add the effect to existing cards
      {
        trigger: { id: "onPlay", self: true },
        actions: [addPowerAction],
      },
      // on play other cards to target tiles, add the effect to them
      // this needs to be a separate effect per tile to ensure that playing
      // a card to a targeted tile only triggers the effect for that new card,
      // and not repeating the effect for existing cards
      ...(addPowerAction.tiles ?? []).map<CardEffect>((tile) => ({
        trigger: { id: "onPlay", tiles: [tile], ...targets },
        actions: [{ ...addPowerAction, tiles: [tile] }],
      })),
      // on destroy remove the effect from all currently affected
      {
        trigger: { id: "onDestroy", self: true },
        actions: [removePowerAction],
      },
    ];
  }

  export function addPips(
    tiles: Vector2[],
    amount: number = 1,
  ): CardAction.AddControlledPips {
    return {
      id: "addControlledPips",
      tiles,
      amount,
    };
  }

  export function addPower(
    tiles: Vector2[],
    amount: number,
    targets: Pick<CardAction.AddPower, "allied" | "opponent">,
  ): CardAction.AddPower {
    return {
      id: "addPower",
      tiles,
      amount,
      ...targets,
    };
  }

  export function createCardForPlayer(
    card: Card,
    player: "allied" | "opponent" = "allied",
    into: "hand" | "deck.random" | "deck.top" = "hand",
  ): CardAction.CreateCardForPlayer {
    return {
      id: "createCardForPlayer",
      card,
      player,
      into,
    };
  }
}
