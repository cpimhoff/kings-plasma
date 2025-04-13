import { CardEffect } from "./CardEffect";
import { Vector2, addVector2s } from '@/utils/vector';

export type Card = {
  id: string;
  name: string;

  // requirements to play this card to the board, either a number of pips or
  // "replace" to replace a card on the board
  playRequirement: number | "replace";

  // score this card contributes to row while on the board
  power: number;

  // effects associated with this card
  effects: CardEffect[];
};

export type CardGridCell = {
  origin: boolean,
  claims: boolean,
  affects: boolean,
};
export type CardGrid = CardGridCell[][];
export const getGridForCard: (card: Card) => CardGridCell[][] = (card) => {
  const templateCell = {
    origin: false,
    claims: false,
    affects: false,
  };
  const grid: CardGrid = Array.from({ length: 5 }, () => (
    Array.from({ length: 5 }, () => ({
      ...templateCell,
    }))));
  const origin: Vector2 = { dx: 2, dy: 2};
  grid[origin.dy][origin.dx].origin = true;
  card.effects.forEach((effect) => {
    effect.actions.forEach((action) => {
        switch (action.id) {
          case 'addControlledPips':
          case 'addPower': {
            action.tiles?.forEach((vector) => {
              let claims = false, affects = false;
              if (effect.trigger.id === 'onPlay' && action.id === 'addControlledPips') {
                claims = true;
              } else {
                affects = true;
              }
              const coords = addVector2s(origin, vector);
              const cell = grid[coords.dy][coords.dx];
              cell.claims = cell.claims || claims;
              cell.affects = cell.affects || affects;
            });
            break;
          }
        }
    });
  });
  return grid;
};

export const getCardHasSpecialEffect = (card: Card) => {
  let ret = false;
  card.effects.forEach((effect) => {
    effect.actions.forEach((action) => {
      switch (action.id) {
        case 'addControlledPips': {
          if (effect.trigger.id !== 'onPlay') {
            ret = true;
          }
          break;
        }
        default:
          ret = true;
      }
    });
  });
  return ret;
}

