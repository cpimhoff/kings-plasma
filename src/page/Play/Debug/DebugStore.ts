import { create } from 'zustand';

interface DebugStore {
  debugMode: boolean;
  editMode: boolean;
  selectedPlayerIdx: number; // overrides all other current-player state
  agentPaused: boolean;

  toggleEditMode: () => void;
  toggleAgentPaused: () => void;
  setSelectedPlayerIdx: (idx: number) => void;
}
export const useDebugStore = create<DebugStore>((set) => ({
  debugMode: window.location.search === '?debug',
  editMode: false,
  selectedPlayerIdx: 0,
  agentPaused: false,

  toggleEditMode: () =>
    set((state) => ({
      editMode: !state.editMode,
    })),

  toggleAgentPaused: () =>
    set((state) => ({
      agentPaused: !state.agentPaused,
    })),

  setSelectedPlayerIdx: (idx) =>
    set({
      selectedPlayerIdx: idx,
    }),
}));
