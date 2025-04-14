import { Player } from '@/gameplay/state/Player';
import { GameState } from '@/gameplay/state/GameState';

export type ViewState = {
  rowScoresByPlayerIdx: Record<Player['id'], number[]>,
};

export const adaptGameState = (gameState: GameState) => {
  const rowScoresByPlayerIdx: ViewState['rowScoresByPlayerIdx'] = {};
  gameState.players.forEach((player) => {
    rowScoresByPlayerIdx[player.id] = new Array(3).fill(0);
  });
  gameState.board.forEach((col) => {
    col.forEach((tile, rowIdx) => {
      const { controllerPlayerId: playerId, card } = tile;
      if (card && playerId) {
        rowScoresByPlayerIdx[playerId][rowIdx] += card.power;
      }
    });
  });
  return {
    rowScoresByPlayerIdx,
  };
}
