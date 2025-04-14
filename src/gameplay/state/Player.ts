import { uuid, UUID } from "@/utils";
import { Card } from "./Card";

export type Player = {
  // player identity
  id: UUID;
  name: string;
  colorCssValue: string;

  // phase states
  phase: {
    setup: { done: boolean };
    play: { passed: boolean };
    end: { requestRematch: boolean };
  };

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
    phase: {
      setup: { done: false },
      play: { passed: false },
      end: { requestRematch: false },
    },
  };
}
