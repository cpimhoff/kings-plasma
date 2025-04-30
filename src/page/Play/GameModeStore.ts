import { Character } from '@/agent/character/Character';
import { Player } from '@/gameplay';
import { produce } from 'immer';
import { create } from 'zustand';

export type GameMode = 'local-2p' | 'local-1p';
interface GameModeStore {
  gameMode: GameMode | null;
  charactersByPlayerId: Record<Player['id'], Character>;
  setGameMode: (gameMode: GameMode) => void;
  setCharacterForPlayer: (character: Character, playerId: Player['id']) => void;
}
export const useGameModeStore = create<GameModeStore>((set) => ({
  gameMode: null,
  charactersByPlayerId: {},

  setGameMode: (gameMode) =>
    set({
      gameMode,
    }),

  setCharacterForPlayer: (character, playerId) =>
    set(
      produce((state) => {
        state.charactersByPlayerId[playerId] = character;
      }),
    ),
}));
