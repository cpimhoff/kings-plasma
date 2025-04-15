import { create } from 'zustand';
import { BoardPosition } from '@/gameplay/state/Board';
import { GameState } from '@/gameplay/state/GameState';
import { Player, getPlayerWithId } from '@/gameplay/state/Player';
import { Card } from '@/gameplay/state/Card';
import { BoardTile } from '@/gameplay/state/Board';

interface SelectionStore {
  selectedHandIndex: number | null;
  selectedBoardPosition: BoardPosition | null;

  clickHandIndex: (handIdx: number) => void;
  clickBoardPosition: (pos: BoardPosition, gameState: GameState) => void;
  resetSelections: () => void;
};

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedHandIndex: null,
  selectedBoardPosition: null,

  clickHandIndex: (handIdx) => {
    const { selectedHandIndex } = get();
    if (selectedHandIndex === handIdx) {
      set({
        selectedHandIndex: null,
        selectedBoardPosition: null,
      });
    } else {
      set({
        selectedHandIndex: handIdx,
        selectedBoardPosition: null,
      });
    }
  },

  clickBoardPosition: (pos, gameState) => {
    // fail fast
    const { selectedHandIndex } = get();
    if (selectedHandIndex === null) return;
    // get target tile
    const tile = gameState.board[pos.x][pos.y];
    // get selected card
    const activePlayer = getPlayerWithId(gameState.players, gameState.playPhaseActivePlayerId);
    const selectedCard = activePlayer.hand[selectedHandIndex];
    // validate
    const isValid = canPlayerPlaceCardAtTile(activePlayer, selectedCard, tile);
    if (!isValid) return;
    set({
      selectedBoardPosition: pos,
    });
  },

  resetSelections: () => set(() => ({
    selectedHandIndex: null,
    selectedBoardPosition: null,
  })),

}));

// TODO: find a better place for this
export function canPlayerPlaceCardAtTile(player: Player, card: Card, tile: BoardTile) {
  if (tile.controllerPlayerId !== player.id) return false;
  if (typeof card.playRequirement === 'number') {
    if (tile.pips < card.playRequirement) return false;
  } else {
    if (tile.card === null) return false;
  }
  return true;
}
