import { Action, GameState, Player } from '@/gameplay';
import { ChoiceFunction } from '../Agent';
import { Heuristic } from './heuristic/Heuristic';
import { validPlayPhaseActionsForPlayer } from '../iter';
import { process } from '@/gameplay/process';

export function greedyChoiceFunction(heuristic: Heuristic): ChoiceFunction {
  return maxDepthMinimaxChoiceFunction(heuristic, 0);
}

export function maxDepthMinimaxChoiceFunction(heuristic: Heuristic, maxDepth: number): ChoiceFunction {
  return (gameState, playerId) => {
    const result = minimaxRecursive(gameState, playerId, playerId, heuristic, false, maxDepth, {});
    return result.action;
  };
}

type Cache = Record<string, MinimaxResult>;
type MinimaxResult = {
  action: Action;
  value: number;
};
function minimaxRecursive(
  gameState: GameState,
  originPlayerId: Player['id'],
  currentPlayerId: Player['id'],
  heuristic: Heuristic,
  isMinimizing: boolean,
  depth: number,
  cache: Cache,
): MinimaxResult {
  let searchResult: MinimaxResult | null = null;
  for (let currentAction of validPlayPhaseActionsForPlayer(gameState, currentPlayerId)) {
    const newGameState = process(gameState, currentAction, { skipKeyframes: true }).state;
    let currentResult: MinimaxResult;
    if (depth === 0 || newGameState.phase === 'end') {
      currentResult = {
        action: currentAction,
        value: heuristic(newGameState, originPlayerId),
      };
    } else {
      const cacheKey = JSON.stringify(newGameState);
      const cacheResult = cache[cacheKey];
      let recursiveResult;
      if (cacheResult) {
        recursiveResult = cacheResult;
      } else {
        recursiveResult = minimaxRecursive(
          newGameState,
          originPlayerId,
          getOtherPlayer(gameState.players, currentPlayerId).id,
          heuristic,
          !isMinimizing,
          depth - 1,
          cache,
        );
        cache[cacheKey] = recursiveResult;
      }
      currentResult = {
        action: currentAction,
        value: recursiveResult.value,
      };
    }
    const factor = isMinimizing ? -1 : 1;
    if (searchResult === null || factor * currentResult.value > factor * searchResult.value) {
      searchResult = currentResult;
    }
  }
  return searchResult!; // there will always be at least one valid action
}

function getOtherPlayer(players: Player[], playerId: Player['id']): Player {
  return players.find((p) => p.id !== playerId)!;
};