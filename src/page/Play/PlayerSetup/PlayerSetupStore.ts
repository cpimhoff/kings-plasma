import { create } from 'zustand';
import { Player } from '@/gameplay/state/Player';
import { produce } from 'immer';

interface PlayerSetupStore {
  playerIdx: number;
  players: Array<Player | null>;

  setPlayerIdx: (playerIdx: number) => void;
  setPlayer: (player: Player) => void;
}

export const usePlayerSetupStore = create<PlayerSetupStore>((set) => ({
  playerIdx: 0,
  players: [null, null],

  setPlayerIdx: (playerIdx) =>
    set(
      produce((state) => {
        state.playerIdx = playerIdx;
      }),
    ),

  setPlayer: (player) =>
    set(
      produce((state) => {
        const existingPlayer = state.players[state.playerIdx];
        state.players[state.playerIdx] = player;
        if (existingPlayer) {
          // don't overwrite IDs
          state.players[state.playerIdx].id = existingPlayer.id;
        }
      }),
    ),
}));
