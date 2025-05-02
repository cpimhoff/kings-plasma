import { Action, GameState, Player } from '@/gameplay';
import { ChoiceFunction } from '../Agent';
import { Heuristic } from './heuristic/Heuristic';
import { validPlayPhaseActionsForPlayer } from '../iter';
import { process } from '@/gameplay/process';

export function greedyChoiceFunction(heuristic: Heuristic): ChoiceFunction {
  return maxDepthMinimaxChoiceFunction(heuristic, 1);
}

export function maxDepthMinimaxChoiceFunction(heuristic: Heuristic, maxDepth: number): ChoiceFunction {
  return (gameState, playerId) => {
    const result = minimaxRecursive(gameState, playerId, heuristic, 1, maxDepth);
    return result.action;
  };
}

type MinimaxResult = {
  action: Action;
  value: number;
};
function minimaxRecursive(
  gameState: GameState,
  playerId: Player['id'],
  heuristic: Heuristic,
  factor: number,
  depth: number,
): MinimaxResult {
  let searchResult: MinimaxResult | null = null;
  for (let currentAction of validPlayPhaseActionsForPlayer(gameState, playerId)) {
    const newGameState = process(gameState, currentAction, { skipKeyframes: true }).state;
    let currentResult: MinimaxResult;
    if (depth === 0) {
      currentResult = {
        action: currentAction,
        value: factor * heuristic(gameState, playerId),
      };
    } else {
      const recursiveResult = minimaxRecursive(newGameState, getOtherPlayer(gameState.players, playerId).id, heuristic, factor * -1, depth - 1);
      currentResult = {
        action: currentAction,
        value: recursiveResult.value,
      };
    }
    if (searchResult === null || currentResult.value > searchResult.value) {
      searchResult = currentResult;
    }
  }
  return searchResult!; // there will always be at least one valid action
}

function getOtherPlayer(players: Player[], playerId: Player['id']): Player {
  return players.find((p) => p.id !== playerId)!;
};