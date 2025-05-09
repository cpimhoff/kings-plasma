import { create } from 'zustand';
import { produce } from 'immer';
import { CardDefinition } from '@/gameplay/state/Card';
import { getRandomAvailableColor, getRandomColor } from './color';
import { createPlayer, Player } from '@/gameplay';
import { toCardInstances, HydratedCardGroup, fromCardInstances } from '@/deck';
import { MAX_CARDS_IN_DECK, MIN_CARDS_IN_DECK } from '@/gameplay/constants';

export type DraftPlayer = {
  name: string;
  colorCssValue: string;
  deckCardGroups: HydratedCardGroup[];
};

interface CreatePlayerStore {
  draftPlayer: DraftPlayer;

  setDraftPlayerName: (name: string) => void;
  setDraftPlayerColor: (color: string) => void;
  addCardToDraftPlayerDeck: (cardDef: CardDefinition) => void;
  removeCardFromDraftPlayerDeck: (cardTypeId: CardDefinition['typeId']) => void;
  replaceDraftPlayerDeck: (newDeck: HydratedCardGroup[]) => void;

  reset: ({ initialPlayerName, colorToAvoid }: { initialPlayerName: string; colorToAvoid?: string }) => void;
  populate: (player: Player) => void;
  isValid: () => boolean;
  getPlayer: () => Player;
}

export const useCreatePlayerStore = create<CreatePlayerStore>((set, get) => ({
  draftPlayer: {
    name: '',
    colorCssValue: getRandomColor(),
    deckCardGroups: [],
  },

  setDraftPlayerName: (newName) =>
    set((state) =>
      produce(state, (draft) => {
        draft.draftPlayer.name = newName;
      }),
    ),

  setDraftPlayerColor: (newColor) =>
    set((state) =>
      produce(state, (draft) => {
        draft.draftPlayer.colorCssValue = newColor;
      }),
    ),

  addCardToDraftPlayerDeck: (cardDef) =>
    set((state) =>
      produce(state, (draft) => {
        const { deckCardGroups } = draft.draftPlayer;
        const existingGroup = deckCardGroups.find((g: HydratedCardGroup) => g.cardDef.typeId === cardDef.typeId);
        if (existingGroup) {
          existingGroup.count++;
        } else {
          deckCardGroups.push({
            cardDef,
            count: 1,
          });
        }
      }),
    ),

  removeCardFromDraftPlayerDeck: (cardTypeId) =>
    set((state) =>
      produce(state, (draft) => {
        const { deckCardGroups } = draft.draftPlayer;
        const existingGroupIndex = deckCardGroups.findIndex((g: HydratedCardGroup) => g.cardDef.typeId === cardTypeId);
        if (existingGroupIndex > -1) {
          const existingGroup = deckCardGroups[existingGroupIndex];
          existingGroup.count--;
          if (existingGroup.count === 0) {
            deckCardGroups.splice(existingGroupIndex, 1);
          }
        }
      }),
    ),

  replaceDraftPlayerDeck: (newDeckCardGroups) =>
    set((state) =>
      produce(state, (draft) => {
        draft.draftPlayer.deckCardGroups = newDeckCardGroups;
      }),
    ),

  reset: ({ initialPlayerName, colorToAvoid }) =>
    set({
      draftPlayer: {
        name: initialPlayerName,
        colorCssValue: getRandomAvailableColor(colorToAvoid),
        deckCardGroups: [],
      },
    }),

  populate: (player) => {
    set({
      draftPlayer: {
        name: player.name,
        colorCssValue: player.colorCssValue,
        deckCardGroups: fromCardInstances(player.deck),
      },
    });
  },

  isValid: () => {
    const deckSize = Object.values(get().draftPlayer.deckCardGroups).reduce((s, g) => s + g.count, 0);
    return deckSize >= MIN_CARDS_IN_DECK && deckSize <= MAX_CARDS_IN_DECK && !!get().draftPlayer.name;
  },

  getPlayer: () => {
    const state = get();
    const player = createPlayer(state.draftPlayer.name, state.draftPlayer.colorCssValue);
    player.deck = toCardInstances(state.draftPlayer.deckCardGroups);
    // (player.hand gets created by game processor)
    return player;
  },
}));
