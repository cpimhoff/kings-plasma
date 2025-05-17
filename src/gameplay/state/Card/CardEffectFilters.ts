import { Vector2 } from '@/utils/vector';
import { CardPowerStatus } from './Card';

export type TileSelector = {
  self?: boolean;
  list?: Array<Vector2>;
};

export type CardEffectFilters = {
  // if set, consider only these tiles. otherwise start with the entire board
  onlyTiles?: TileSelector;
  // if set, exclude these tiles. takes precedent over 'onlyTiles'
  excludeTiles?: TileSelector;
  // if set, filter to cards owned by the given player
  allegiance?: 'allied' | 'opponent';
  // if set, filter to cards with the given power statuses
  powerStatus?: Partial<Record<CardPowerStatus, boolean>>;
  // if set, filter to cards with this exact power level (base plus modifier)
  powerLevel?: number;
};
