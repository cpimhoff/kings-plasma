import { create } from 'zustand';
import { produce } from 'immer';
import { Card } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import { CardMultiSet, createEmpty, addCardToMultiSet } from './CardMultiSet';

interface DeckSelectionStore {
  players: Player[],
  draftPlayerDeck: CardMultiSet,

  addPlayerFromDraft: (name: string) => void;
  addCardToDraftPlayerDeck: (card: Card) => void;
};

export const useDeckSelectionStore = create<DeckSelectionStore>((set) => ({
  players: [],
  draftPlayerDeck: createEmpty(),

  addPlayerFromDraft: (name) => set((state) => {
    const player = createPlayer(name);
    player.deck = createDeckFromDraft(state.draftPlayerDeck);
    return {
      players: [...state.players, player],
      draftPlayerDeck: createEmpty(),
    };
  }),

  addCardToDraftPlayerDeck: (card) => set((state) => {
    return produce(state, draft => {
      addCardToMultiSet(card, draft.draftPlayerDeck);
    });
  }),
}));

function createDeckFromDraft(draftDeck: CardMultiSet) {
  const deck: Player['deck']  = [];
  Object.keys(draftDeck).forEach((cardId) => {
    deck.push(draftDeck.cardsById[cardId]);
  });
  return deck;
};
