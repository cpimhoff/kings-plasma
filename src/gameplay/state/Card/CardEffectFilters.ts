import { Vector2 } from '@/utils/vector';
import { CardPowerStatus } from './Card';

export type CardEffectFilters = {
  // if set, only consider these cards. otherwise search the entire board
  limitTo?: {
    // match source
    self?: boolean;
    // match cards in these relative positions
    tiles?: Array<Vector2>;
  };
  // if set, filter to cards owned by the given player
  allegiance?: 'allied' | 'opponent';
  // if set, filter to cards with the given power statuses
  powerStatus?: Partial<Record<CardPowerStatus, boolean>>;
};
