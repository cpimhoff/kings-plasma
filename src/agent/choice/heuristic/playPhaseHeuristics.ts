import { getPlayerScores } from '@/gameplay';
import { allBoardTiles } from '@/gameplay/process/iter';
import { Heuristic } from './Heuristic';

export const ownTerritory: Heuristic = (gameState, playerId) => {
  return [...allBoardTiles(gameState)].reduce((sum, tile) => {
    if (tile.controllerPlayerId === playerId) {
      return sum + 1;
    }
    return sum;
  }, 0);
};

export const relativeTerritory: Heuristic = (gameState, playerId) => {
  const otherPlayerId = gameState.players.find((p) => p.id !== playerId)!.id;
  return ownTerritory(gameState, playerId) - ownTerritory(gameState, otherPlayerId);
};

export const ownScore: Heuristic = (gameState, playerId) => {
  return getPlayerScores(gameState).scoreByPlayer[playerId];
};

export const victory: Heuristic = (gameState, playerId) => {
  const isVictor = gameState.phase === 'end' && getPlayerScores(gameState).winningPlayerId === playerId;
  return isVictor ? 1 : 0;
};

export const defeat: Heuristic = (gameState, playerId) => {
  const isEnd = gameState.phase === 'end';
  const { winningPlayerId } = getPlayerScores(gameState);
  const isLoser = isEnd && !!winningPlayerId && winningPlayerId !== playerId;
  return isLoser ? 1 : 0;
};
