import { create } from 'zustand';
import { BoardPosition, BoardTile } from '@/gameplay/state/Board';
import { Phase } from '@/gameplay/state/Phase';
import { Card } from '@/gameplay/state/Card';
import { Player } from '@/gameplay/state/Player';

const MAX_CARDS_TO_MULLIGAN = 3;

interface SelectionStore {
  selectedHandIndexes: number[];
  selectedBoardPosition: BoardPosition | null;

  clickHandIndex: (handIdx: number, phase: Phase) => void;
  clickBoardTile: (tile: BoardTile, selectedCard: Card, playerId: Player['id']) => void;
  reset: () => void;
};

export const useSelectionStore = create<SelectionStore>((set) => ({
  selectedHandIndexes: [],
  selectedBoardPosition: null,

  clickHandIndex: (idx, phase) => set((state) => {
    let newVal;
    if (phase === 'setup') {
      if (state.selectedHandIndexes.length === MAX_CARDS_TO_MULLIGAN) {
        newVal = state.selectedHandIndexes;
      }
      if (state.selectedHandIndexes.includes(idx)) {
          newVal = state.selectedHandIndexes.filter(i => i !== idx);
      } else {
          newVal = [...state.selectedHandIndexes, idx];
      }
    } else {
      newVal = [idx];
    }
    return {
      selectedHandIndexes: newVal,
    };
  }),

  clickBoardTile: (tile, selectedCard, playerId) => set(() => {
    let isValidSelection = false;
    if (tile.controllerPlayerId === playerId) {
      if (typeof selectedCard.playRequirement === 'number') {
        isValidSelection = !tile.card && tile.pips >= selectedCard.playRequirement;
      }
      if (selectedCard.playRequirement === 'replace') {
        isValidSelection = !!tile.card;
      }
    }
    return {
      selectedBoardPosition: isValidSelection ? tile.position : null,
    };
  }),

  reset: () => set(() => ({
    selectedHandIndexes: [],
    selectedBoardPosition: null,
  })),

}));
