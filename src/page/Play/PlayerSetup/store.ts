import { create } from 'zustand';
import { produce } from 'immer';
import { Card, withReversedVectors } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import { HSLColor } from 'react-color';
import { getRandomHSLColor, stringifyHSLColor } from './color';
import CardMultiSet from './CardMultiSet';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';

const DEFAULT_PLAYER_NAMES = ['Lefty', 'Righty'];

interface PlayerSetupStore {
  players: Player[],
  draftPlayer: {
    name: string,
    color: HSLColor,
    deck: CardMultiSet,
  },

  cardLibrary: CardMultiSet;

  setDraftPlayerName: (name: string) => void;
  setDraftPlayerColor: (color: HSLColor) => void;
  addPlayerFromDraft: () => void;
  addCardToDraftPlayerDeck: (card: Card) => void;
  removeCardFromDraftPlayerDeck: (card: Card) => void;
};

export const usePlayerSetupStore = create<PlayerSetupStore>((set) => ({
  players: [],
  draftPlayer: {
    name: DEFAULT_PLAYER_NAMES[0],
    color: getRandomHSLColor(),
    deck: new CardMultiSet(),
  },

  cardLibrary: initCardLibrary(),

  setDraftPlayerName: (newName) => set(produce((state) => {
    state.draftPlayer.name = newName;
  })),

  setDraftPlayerColor: (newColor) => set(produce((state) => {
    state.draftPlayer.color = newColor;
  })),

  addCardToDraftPlayerDeck: (card) => set(produce((state) => {
    // add to deck
    const newDraftPlayerDeck = state.draftPlayer.deck.clone();
    newDraftPlayerDeck.addCard(card);
    state.draftPlayer.deck = newDraftPlayerDeck;
    // remove from library
    const newCardLibrary = state.cardLibrary.clone();
    newCardLibrary.removeCard(card);
    state.cardLibrary = newCardLibrary;
  })),

  removeCardFromDraftPlayerDeck: (card) => set(produce((state) => {
    // remove from deck
    const newDraftPlayerDeck = state.draftPlayer.deck.clone();
    newDraftPlayerDeck.removeCard(card);
    state.draftPlayer.deck = newDraftPlayerDeck;
    // add to library
    const newCardLibrary = state.cardLibrary.clone();
    newCardLibrary.addCard(card);
    state.cardLibrary = newCardLibrary;
  })),

  addPlayerFromDraft: () => set((state) => {
    const player = createPlayer(state.draftPlayer.name, stringifyHSLColor(state.draftPlayer.color));
    player.deck = createDeckFromDraft(state.draftPlayer.deck);
    // (player.hand gets created by game processor)
    return {
      players: [...state.players, player],
      draftPlayer: {
        name: DEFAULT_PLAYER_NAMES[1],
        color: getRandomHSLColor(),
        deck: new CardMultiSet(),
      },
      cardLibrary: initCardLibrary(true),
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

function initCardLibrary(reverse: boolean = false) {
  const library = new CardMultiSet();
  FF7_LIBRARY
  .map(card => reverse ? withReversedVectors(card) : card)
  .forEach(card => {
    const count = card.isLegendary ? 1 : 3;
    library.addCard(card, count);
  });
  return library;
};
