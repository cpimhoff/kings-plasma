import { Player } from '@/gameplay/state/Player';
import { GameState } from '@/gameplay/state/GameState';

export type ScoreByPlayer = Record<Player['id'], number>;

export type ScoreResult = {
  scoreByPlayer: ScoreByPlayer;
  winningPlayerId: Player['id'] | null; // for convenience
};

export function getRowScores(gameState: GameState): ScoreResult[] {
  const { board, players } = gameState;
  const rowResults: ScoreResult[] = Array.from({ length: board[0].length }).map(() => getEmptyScores(players));
  // count up all points on the board, organized by row -> player
  board.forEach((col) => {
    col.forEach((tile, rowIdx) => {
      const { controllerPlayerId: playerId, card } = tile;
      if (card && playerId) {
        rowResults[rowIdx].scoreByPlayer[playerId] += card.power;
      }
    });
  });
  // calculate winners of each row
  rowResults.forEach((rowResult) => {
    rowResult.winningPlayerId = getWinningPlayerId(rowResult.scoreByPlayer);
  });

  return rowResults;
}

export function getPlayerScores(gameState: GameState): ScoreResult {
  const rowScores = getRowScores(gameState);
  const finalScores: ScoreResult = rowScores.reduce((finalScore, rowScore) => {
    const { scoreByPlayer, winningPlayerId } = rowScore;
    if (winningPlayerId !== null) {
      finalScore.scoreByPlayer[winningPlayerId] += scoreByPlayer[winningPlayerId];
    }
    return finalScore;
  }, getEmptyScores(gameState.players));
  finalScores.winningPlayerId = getWinningPlayerId(finalScores.scoreByPlayer);
  return finalScores;
}

// private functions

function getEmptyScores(players: Player[]): ScoreResult {
  return {
    scoreByPlayer: Object.assign({}, ...players.map((p) => ({ [p.id]: 0 }))),
    winningPlayerId: null,
  };
}

function getWinningPlayerId(scores: ScoreByPlayer): Player['id'] | null {
  const sortedPlayerScores = Object.entries(scores)
    .map(([playerId, score]) => ({
      playerId: playerId as Player['id'],
      score,
    }))
    .sort(({ score: score1 }, { score: score2 }) => score2 - score1);
  if (sortedPlayerScores[0].score !== sortedPlayerScores[1].score) {
    return sortedPlayerScores[0].playerId;
  }
  return null;
}
