import { create } from 'zustand';
import { produce } from 'immer';
import { Card } from '@/gameplay/state/Card';
import { CardMultiSet, createEmpty, addCardToMultiSet, removeCardFromMultiSet } from '../CardMultiSet';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';

export interface LibraryQueryResultItem {
  card: Card;
  count: number,
};

interface CardLibraryStore {
  cardLibrary: CardMultiSet,

  // todo: sorting/filtering?
  getCardsWithCounts: () => LibraryQueryResultItem[],

  takeCard: (card: Card) => void;
  replaceCard: (card: Card) => void;
};

export const useCardLibraryStore = create<CardLibraryStore>((set, get) => ({
  cardLibrary: initLibrary(),

  getCardsWithCounts: () => {
    const counts = get().cardLibrary.cardCountById;
    const cards = get().cardLibrary.cardsById;
    return Object.keys(cards).map((cardId) => ({
      card: cards[cardId],
      count: counts[cardId],
    }));
  },

  takeCard: (card) => set((state) => {
    return produce(state, draft => {
      removeCardFromMultiSet(card, draft.cardLibrary);
    });
  }),

  replaceCard: (card) => set((state) => {
    return produce(state, draft => {
      addCardToMultiSet(card, draft.cardLibrary);
    });
  }),
}));

function initLibrary() {
  const library = createEmpty();
  FF7_LIBRARY.forEach(card => {
    library.cardsById[card.id] = card;
    const count = card.isLegendary ? 1 : 3;
    library.cardCountById[card.id] = count;
  });
  return library;
};
