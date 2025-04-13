import { create } from 'zustand';
import { produce } from 'immer';
import { Card } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import { DraftPlayerDeck, emptyDeck } from './DraftPlayerDeck';

interface DeckSelectionStore {
  players: Player[],
  draftPlayerDeck: DraftPlayerDeck,

  addPlayerFromDraft: (name: string) => void;
  addCardToDraftPlayerDeck: (card: Card) => void;
};

export const useDeckSelectionStore = create<DeckSelectionStore>((set) => ({
  players: [],
  draftPlayerDeck: emptyDeck(),

  addPlayerFromDraft: (name) => set((state) => {
    const player = createPlayer(name);
    player.deck = createDeckFromDraft(state.draftPlayerDeck);
    return {
      players: [...state.players, player],
      draftPlayerDeck: emptyDeck(),
    };
  }),

  addCardToDraftPlayerDeck: (card) => set((state) => {
    return produce(state, draft => {
      if (draft.draftPlayerDeck.cardsById[card.id]) {
        draft.draftPlayerDeck.cardCountById[card.id]++;
      } else {
        draft.draftPlayerDeck.cardsById[card.id] = card;
        draft.draftPlayerDeck.cardCountById[card.id] = 1;
      }
    });
  }),
}));

function createDeckFromDraft(draftDeck) {
  const deck: Player['deck']  = [];
  Object.keys(draftDeck).forEach((cardId) => {
    deck.push(draftDeck.cardsById[cardId]);
  });
  return deck;
};
