import { uuid, UUID } from "@/utils";
import { Card } from "./Card";

export type Player = {
  // player identity
  id: UUID;
  name: string;
  colorCssValue: string;

  // game state
  deck: Card[];
  hand: Card[];
};

export function createPlayer(name: string): Player {
  return {
    id: uuid(),
    name,
    colorCssValue: `hsl(${Math.random() * 360}, 100%, 50%)`,
    deck: [],
    hand: [],
  };
}
