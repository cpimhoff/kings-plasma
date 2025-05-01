import { Action, GameState, Player } from '@/gameplay';
import { ChoiceFunction } from './Agent';
import { Heuristic } from './heuristic/Heuristic';
import { validPlayPhaseActionsForPlayer } from './iter';
import { process } from '@/gameplay/process';

export function greedyPlayPhaseChoiceFunction(heuristic: Heuristic): ChoiceFunction {
  return (gameState: GameState, playerId: Player['id']) => {
    let currentValue = heuristic(gameState, playerId);
    let candidateAction: Action = {
      type: 'pass',
      playerId,
    };
    for (let currentAction of validPlayPhaseActionsForPlayer(gameState, playerId)) {
      const newGameState = process(gameState, currentAction, { skipKeyframes: true }).state;
      const newValue = heuristic(newGameState, playerId);
      if (newValue > currentValue) {
        currentValue = newValue;
        candidateAction = currentAction;
      }
    }
    return candidateAction;
  };
}
