import { create } from 'zustand';

export type GameMode = 'local-2p' | 'local-1p';
interface GameModeStore {
  gameMode: GameMode | null;
  setGameMode: (gameMode: GameMode) => void;
}
export const useGameModeStore = create<GameModeStore>((set) => ({
  gameMode: null,

  setGameMode: (gameMode: GameMode) =>
    set({
      gameMode,
    }),
}));
