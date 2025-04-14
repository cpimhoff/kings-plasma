import { create } from 'zustand';
import { BoardPosition } from '@/gameplay/state/Board';
import { Phase } from '@/gameplay/state/Phase';

const MAX_CARDS_TO_MULLIGAN = 3;

interface SelectionStore {
  selectedHandIndexes: number[];
  selectedBoardPosition: BoardPosition | null;

  clickHandIndex: (handIdx: number, phase: Phase) => void;
  clickBoardPosition: (pos: BoardPosition) => void;
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

  clickBoardPosition: (pos) => set(() => {
    return {
      selectedBoardPosition: pos,
    };
  }),

  reset: () => set(() => ({
    selectedHandIndexes: [],
    selectedBoardPosition: null,
  })),

}));
