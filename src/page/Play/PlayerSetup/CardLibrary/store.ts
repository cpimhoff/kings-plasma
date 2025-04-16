import { create } from 'zustand';
import { Card, withReversedVectors } from '@/gameplay/state/Card';
import CardMultiSet from '../CardMultiSet';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';

interface CardLibraryStore {
  cardLibrary: CardMultiSet;
  isTrailingPlayer: boolean;

  takeCard: (card: Card) => void;
  replaceCard: (card: Card) => void;
  reset: () => void;
};

export const useCardLibraryStore = create<CardLibraryStore>((set) => ({
  cardLibrary: initLibrary(),
  isTrailingPlayer: false,

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

  reset: () => set({
    cardLibrary: initLibrary(true),
    isTrailingPlayer: true,
  }),
}));

function initLibrary(reverse: boolean = false) {
  const library = new CardMultiSet();
  FF7_LIBRARY
    .map(card => reverse ? withReversedVectors(card) : card)
    .forEach(card => {
      const count = card.isLegendary ? 1 : 3;
      library.addCard(card, count);
    });
  return library;
};
