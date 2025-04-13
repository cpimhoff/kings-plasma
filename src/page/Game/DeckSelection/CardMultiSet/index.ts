import { Card } from '@/gameplay/state/Card/Card';

export type CardMultiSet = {
  cardsById: Record<Card['id'], Card>,
  cardCountById: Record<Card['id'], number>,
};

export const createEmpty: () => CardMultiSet = () => ({
  cardsById: {},
  cardCountById: {},
});

export const addCardToMultiSet = (card: Card, multiSet: CardMultiSet) => {
  if (multiSet.cardsById[card.id]) {
    multiSet.cardCountById[card.id]++;
  } else {
    multiSet.cardsById[card.id] = card;
    multiSet.cardCountById[card.id] = 1;
  }
};

export const removeCardFromMultiSet = (card: Card, multiSet: CardMultiSet) => {
  if (multiSet.cardCountById[card.id] > 0) {
    multiSet.cardCountById[card.id]--;
  } else {
    throw new Error(`card id ${card.id} not contained in multiset`);
  }
};
