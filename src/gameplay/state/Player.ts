import { uuid, UUID } from '@/utils';
import { CardInstance } from './Card';

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
  deck: CardInstance[];
  hand: CardInstance[];
};

export function createPlayer(name: string, colorCssValue: string): Player {
  return {
    id: uuid(),
    name,
    colorCssValue,
    deck: [],
    hand: [],
    phase: {
      setup: { done: false },
      play: { passed: false },
      end: { requestRematch: false },
    },
  };
}

export function getPlayerWithId(players: Player[], id: Player['id']): Player {
  return players.find((p) => p.id === id) as Player;
}
