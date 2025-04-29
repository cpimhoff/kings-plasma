import { create } from 'zustand';
import { produce } from 'immer';
import { CardDefinition, CardInstance, withReversedVectors } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';
import { getRandomColor } from './color';
import { FF7_LIBRARY } from '@/gameplay/library/ff7Library';
import { uuid } from '@/utils';

const DEFAULT_PLAYER_NAMES = ['Lefty', 'Righty'];

export type DeckCardGroup = {
  cardDef: CardDefinition;
  count: number;
};

interface PlayerSetupStore {
  players: Player[];
  cardLibrary: CardDefinition[];
  draftPlayer: {
    name: string;
    colorCssValue: string;
    deckCardGroups: DeckCardGroup[];
  };

  setDraftPlayerName: (name: string) => void;
  setDraftPlayerColor: (color: string) => void;
  addPlayerFromDraft: () => void;
  addCardToDraftPlayerDeck: (cardDef: CardDefinition) => void;
  removeCardFromDraftPlayerDeck: (cardTypeId: CardDefinition['typeId']) => void;
  replaceDraftPlayerDeck: (newDeck: DeckCardGroup[]) => void;
}

export const usePlayerSetupStore = create<PlayerSetupStore>((set) => ({
  players: [],
  draftPlayer: {
    name: DEFAULT_PLAYER_NAMES[0],
    colorCssValue: getRandomColor(),
    deckCardGroups: [],
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

  addCardToDraftPlayerDeck: (cardDef) =>
    set(
      produce((state) => {
        const { deckCardGroups } = state.draftPlayer;
        const existingGroup = deckCardGroups.find((g: DeckCardGroup) => g.cardDef.typeId === cardDef.typeId);
        if (existingGroup) {
          existingGroup.count++;
        } else {
          deckCardGroups.push({
            cardDef,
            count: 1,
            maxCount: cardDef.isLegendary ? 1 : 3,
          });
        }
      }),
    ),

  removeCardFromDraftPlayerDeck: (cardTypeId) =>
    set(
      produce((state) => {
        const { deckCardGroups } = state.draftPlayer;
        const existingGroupIndex = deckCardGroups.findIndex((g: DeckCardGroup) => g.cardDef.typeId === cardTypeId);
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
    set(
      produce((state) => {
        state.draftPlayer.deckCardGroups = newDeckCardGroups;
      }),
    ),

  addPlayerFromDraft: () =>
    set((state) => {
      const player = createPlayer(state.draftPlayer.name, state.draftPlayer.colorCssValue);
      player.deck = createDeckFromDraft(state.draftPlayer.deckCardGroups);
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
          deckCardGroups: [],
        },
        cardLibrary: state.cardLibrary.map(withReversedVectors),
      };
    }),
}));

function createDeckFromDraft(deckCardGroups: DeckCardGroup[]): CardInstance[] {
  return deckCardGroups
    .map((cardGroup) => {
      return new Array(cardGroup.count)
        .fill(0)
        .map(() => ({ ...cardGroup.cardDef, instanceId: uuid() as CardInstance['instanceId'] }));
    })
    .reduce((accum, curr) => [...accum, ...curr]);
}
