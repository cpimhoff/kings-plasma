import { create } from 'zustand';
import { produce } from 'immer';
import { Card } from '@/gameplay/state/Card';
import { Player, createPlayer } from '@/gameplay/state/Player';

interface DeckSelectionStore {
  players: Player[],
  draftPlayer: Player,

  confirmDraftPlayer: () => void;
  addCardToDraftPlayerDeck: (card: Card) => void;
};

export const useDeckSelectionStore = create<DeckSelectionStore>((set) => ({
  players: [],
  draftPlayer: createPlayer(''),

  confirmDraftPlayer: () => set((state) => ({
    players: [...state.players, state.draftPlayer!],
    draftPlayer: createPlayer(''),
  })),

  addCardToDraftPlayerDeck: (card) => set((state) => {
    return produce(state, draft => {
      draft.draftPlayer!.deck.push(card);
    });
  }),
}));
