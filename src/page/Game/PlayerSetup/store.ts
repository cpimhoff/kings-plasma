import { create } from 'zustand';
import { Card } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import CardMultiSet from './CardMultiSet';

const DEFAULT_PLAYER_NAMES = ['Lefty', 'Righty'];

interface PlayerSetupStor {
  players: Player[],
  draftPlayerName: string,
  draftPlayerDeck: CardMultiSet,

  setDraftPlayerName: (name: string) => void;
  addPlayerFromDraft: () => void;
  addCardToDraftPlayerDeck: (card: Card) => void;
  removeCardFromDraftPlayerDeck: (card: Card) => void;
};

export const usePlayerSetupStore = create<PlayerSetupStor>((set) => ({
  players: [],
  draftPlayerName: DEFAULT_PLAYER_NAMES[0],
  draftPlayerDeck: new CardMultiSet(),

  setDraftPlayerName: (newName) => set(() => ({
    draftPlayerName: newName,
  })),

  addCardToDraftPlayerDeck: (card) => set((state) => {
    const newDraftPlayerDeck = state.draftPlayerDeck.clone();
    newDraftPlayerDeck.addCard(card);
    return {
      draftPlayerDeck: newDraftPlayerDeck,
    };
  }),

  removeCardFromDraftPlayerDeck: (card) => set((state) => {
    const newDraftPlayerDeck = state.draftPlayerDeck.clone();
    newDraftPlayerDeck.removeCard(card);
    return {
      draftPlayerDeck: newDraftPlayerDeck,
    };
  }),

  addPlayerFromDraft: () => set((state) => {
    const player = createPlayer(state.draftPlayerName);
    player.deck = createDeckFromDraft(state.draftPlayerDeck);
    return {
      players: [...state.players, player],
      draftPlayerName: DEFAULT_PLAYER_NAMES[1],
      draftPlayerDeck: new CardMultiSet(),
    };
  }),

}));

function createDeckFromDraft(draftDeck: CardMultiSet) {
  const deck: Player['deck']  = [];
  draftDeck.asArray().forEach(({ card, count }) => {
    new Array(count).fill(0).forEach(() => {
      deck.push(card);
    });
  });
  return deck;
};
