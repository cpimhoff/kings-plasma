import { create } from 'zustand';
import { BoardPosition } from '@/gameplay/state/Board';

interface HoverStore {
  hoveredHandIndex: number | null;
  hoveredBoardPosition: BoardPosition | null;

  hoverOverHandIndex: (handIdx: number) => void;
  hoverOverBoardPosition: (pos: BoardPosition) => void;
  resetHover: () => void;
};

export const useHoverStore = create<HoverStore>((set) => ({
  hoveredHandIndex: null,
  hoveredBoardPosition: null,

  hoverOverHandIndex: (handIdx) => set({
    hoveredHandIndex: handIdx,
  }),

  hoverOverBoardPosition: (pos) => set({
    hoveredBoardPosition: pos,
  }),

  resetHover: () => set({
    hoveredHandIndex: null,
    hoveredBoardPosition: null,
  }),

}));
