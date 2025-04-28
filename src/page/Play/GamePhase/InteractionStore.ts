import { create } from 'zustand';
import { BoardPosition } from '@/gameplay/state/Board';

interface InteractionStore {
  // ==state==
  // hovered
  hoveredHandIndex: number | null;
  hoveredBoardPosition: BoardPosition | null;

  // selected
  selectedHandIndex: number | null;

  // ==actions==
  // hover
  hoverOverHandIndex: (handIdx: number) => void;
  hoverOverBoardPosition: (pos: BoardPosition) => void;

  // click
  clickHandIndex: (handIdx: number) => void;

  // reset
  resetHover: () => void;
  resetSelections: () => void;
}

export const useInteractionStore = create<InteractionStore>((set, get) => ({
  hoveredHandIndex: null,
  hoveredBoardPosition: null,
  selectedHandIndex: null,
  selectedBoardPosition: null,

  hoverOverHandIndex: (handIdx) =>
    set({
      hoveredHandIndex: handIdx,
    }),

  hoverOverBoardPosition: (pos) =>
    set({
      hoveredBoardPosition: pos,
    }),

  clickHandIndex: (handIdx) => {
    const { selectedHandIndex } = get();
    if (selectedHandIndex === handIdx) {
      set({
        selectedHandIndex: null,
      });
    } else {
      set({
        selectedHandIndex: handIdx,
      });
    }
  },

  resetHover: () =>
    set({
      hoveredHandIndex: null,
      hoveredBoardPosition: null,
    }),

  resetSelections: () =>
    set({
      selectedHandIndex: null,
    }),
}));
