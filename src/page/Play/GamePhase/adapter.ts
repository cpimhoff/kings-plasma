import { Player } from '@/gameplay/state/Player';
import { GameState } from '@/gameplay/state/GameState';

export type ViewState = {
  rowScoresByPlayerId: Record<Player['id'], number[]>;
  pointsByPlayerId: Record<Player['id'], number>;
};

export const adaptGameState = (gameState: GameState) => {
  // calculate row scores for both sides
  const { players, board } = gameState;
  const rowScoresByPlayerId: ViewState['rowScoresByPlayerId'] = {};
  players.forEach((player) => {
    rowScoresByPlayerId[player.id] = new Array(3).fill(0);
  });
  board.forEach((col) => {
    col.forEach((tile, rowIdx) => {
      const { controllerPlayerId: playerId, card } = tile;
      if (card && playerId) {
        rowScoresByPlayerId[playerId][rowIdx] += card.power;
      }
    });
  });

  // calculate winning row scores
  type RowResult =
    | {
        winningScore: number;
        winningPlayerId: Player['id'];
      }
    | 'tie';
  const rowResults: RowResult[] = board[0].map((_, rowIndex) => {
    const playerScores = Object.keys(rowScoresByPlayerId).map((playerId) => ({
      playerId,
      rowScore: rowScoresByPlayerId[playerId][rowIndex],
    }));
    if (playerScores[0].rowScore === playerScores[1].rowScore) {
      return 'tie';
    }
    const winningPlayerId = playerScores.sort((a, b) => b.rowScore - a.rowScore)[0].playerId;
    const winningScore = rowScoresByPlayerId[winningPlayerId][rowIndex];
    return {
      winningPlayerId,
      winningScore,
    };
  });

  const pointsByPlayerId: ViewState['pointsByPlayerId'] = {};
  players.forEach((player) => {
    pointsByPlayerId[player.id] = 0;
  });
  rowResults.forEach((rowResult) => {
    if (rowResult === 'tie') return;
    pointsByPlayerId[rowResult.winningPlayerId] += rowResult.winningScore;
  });

  return {
    rowScoresByPlayerId,
    pointsByPlayerId,
  };
};
