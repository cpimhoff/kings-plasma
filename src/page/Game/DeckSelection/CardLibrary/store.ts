import { create } from 'zustand';
import { Card } from '@/gameplay/state/Card';
import CardMultiSet from '../CardMultiSet';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';

interface CardLibraryStore {
  cardLibrary: CardMultiSet,

  takeCard: (card: Card) => void;
  replaceCard: (card: Card) => void;
  reset: () => void;
};

export const useCardLibraryStore = create<CardLibraryStore>((set) => ({
  cardLibrary: initLibrary(),

  takeCard: (card) => set((state) => {
    const newCardLibrary = state.cardLibrary.clone();
    newCardLibrary.removeCard(card);
    return {
      cardLibrary: newCardLibrary,
    };
  }),

  replaceCard: (card) => set((state) => {
    const newCardLibrary = state.cardLibrary.clone();
    newCardLibrary.addCard(card);
    return {
      cardLibrary: newCardLibrary,
    };
  }),

  reset: () => set(() => ({
    cardLibrary: initLibrary(),
  })),
}));

function initLibrary() {
  const library = new CardMultiSet();
  FF7_LIBRARY.forEach(card => {
    const count = card.isLegendary ? 1 : 3;
    library.addCard(card, count);
  });
  return library;
};
