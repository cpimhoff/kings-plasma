import { CardEffect } from "./CardEffect";

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
