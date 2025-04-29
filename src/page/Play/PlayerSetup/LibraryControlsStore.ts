import { create } from 'zustand';
import { produce } from 'immer';
import { CardDefinition } from '@/gameplay';

export type Rank = CardDefinition['playRequirement'];
export type RankFilters = Record<Rank, boolean>;
export type Power = CardDefinition['power'];
export type PowerRange = [Power, Power];
export type SortAttribute = 'index' | 'rank' | 'power';
export type SortDirection = 'ascending' | 'descending';
export type SortMethod = {
  attribute: SortAttribute;
  direction: SortDirection;
};

interface LibraryControlsStore {
  rankFilters: RankFilters;
  powerRange: PowerRange;
  sortMethod: SortMethod;

  toggleRankFilter: (r: Rank) => void;
  setPowerRange: (r: PowerRange) => void;
  setSortMethod: (m: SortMethod) => void;
}
export const useLibraryControlsStore = create<LibraryControlsStore>((set) => ({
  rankFilters: {
    replace: true,
    1: true,
    2: true,
    3: true,
  },
  powerRange: [0, -1], // -1 = max
  sortMethod: {
    attribute: 'index',
    direction: 'ascending',
  },

  toggleRankFilter: (rank: Rank) =>
    set((state) => ({
      rankFilters: produce(state.rankFilters, (draft) => {
        draft[rank] = !draft[rank];
      }),
    })),

  setPowerRange: (newRange: PowerRange) =>
    set({
      powerRange: newRange,
    }),

  setSortMethod: (newMethod: SortMethod) =>
    set({
      sortMethod: newMethod,
    }),
}));
