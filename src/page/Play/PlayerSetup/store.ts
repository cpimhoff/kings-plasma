import { create } from 'zustand';
import { produce } from 'immer';
import { CardDefinition, CardInstance, withReversedVectors } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import { getRandomColor } from './color';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';
import { uuid } from '@/utils';

const DEFAULT_PLAYER_NAMES = ['Lefty', 'Righty'];

interface PlayerSetupStore {
  players: Player[];
  cardLibrary: CardDefinition[];
  draftPlayer: {
    name: string;
    colorCssValue: string;
    deckCounts: number[];
  };

  setDraftPlayerName: (name: string) => void;
  setDraftPlayerColor: (color: string) => void;
  addPlayerFromDraft: () => void;
  addCardToDraftPlayerDeck: (cardIdx: number) => void;
  removeCardFromDraftPlayerDeck: (cardIdx: number) => void;
}

export const usePlayerSetupStore = create<PlayerSetupStore>((set) => ({
  players: [],
  draftPlayer: {
    name: DEFAULT_PLAYER_NAMES[0],
    colorCssValue: getRandomColor(),
    deckCounts: [],
  },
  cardLibrary: FF7_LIBRARY,

  setDraftPlayerName: (newName) =>
    set(
      produce((state) => {
        state.draftPlayer.name = newName;
      }),
    ),

  setDraftPlayerColor: (newColor) =>
    set(
      produce((state) => {
        state.draftPlayer.colorCssValue = newColor;
      }),
    ),

  addCardToDraftPlayerDeck: (cardIdx: number) =>
    set(
      produce((state) => {
        const { deckCounts } = state.draftPlayer;
        deckCounts[cardIdx] = (deckCounts[cardIdx] ?? 0) + 1;
      }),
    ),

  removeCardFromDraftPlayerDeck: (cardIdx: number) =>
    set(
      produce((state) => {
        const { deckCounts } = state.draftPlayer;
        deckCounts[cardIdx] = (deckCounts[cardIdx] ?? 0) - 1;
      }),
    ),

  addPlayerFromDraft: () =>
    set((state) => {
      const player = createPlayer(state.draftPlayer.name, state.draftPlayer.colorCssValue);
      player.deck = createDeckFromDraft(state.cardLibrary, state.draftPlayer.deckCounts);
      // (player.hand gets created by game processor)
      let newColor;
      do {
        newColor = getRandomColor();
      } while (newColor === player.colorCssValue);
      return {
        players: [...state.players, player],
        draftPlayer: {
          name: DEFAULT_PLAYER_NAMES[1],
          colorCssValue: newColor,
          deckCounts: [],
        },
        cardLibrary: state.cardLibrary.map(withReversedVectors),
      };
    }),
}));

function createDeckFromDraft(library: CardDefinition[], deckCounts: number[]) {
  const deck: Player['deck'] = [];
  deckCounts.forEach((count, cardIdx) => {
    const cardDef = library[cardIdx];
    deck.push(...Array.from({ length: count }).map(() => ({ ...cardDef, instanceId: uuid() as CardInstance['instanceId'] })));
  });
  return deck;
}
