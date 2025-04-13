import { Card as ICard } from '@/gameplay/state/Card/Card';

export type DraftPlayerDeck = {
  cardsById: Record<ICard['id'], ICard>,
  cardCountById: Record<ICard['id'], number>,
};

export const emptyDeck = () => ({
  cardsById: {},
  cardCountById: {},
});
