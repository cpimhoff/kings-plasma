import { Action, GameState, Player } from '@/gameplay';
import { createAgentByPhase } from '../Agent';
import { mulliganHighRankCards } from '../heuristic/setupPhase';
import { defeat, ownScore, ownTerritory, relativeTerritory, victory } from '../heuristic/playPhase';
import { weigh, WeightedHeuristic } from '../heuristic/Heuristic';
import { greedyPlayPhaseChoiceFunction } from '../greedy';

export const GreedyMixedHeuristic = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: weigtedGreedyChoice,
});

const weights: WeightedHeuristic[] = [
  {
    heuristic: defeat,
    weight: -100,
  },
  {
    heuristic: victory,
    weight: 100,
  },
  {
    heuristic: ownScore,
    weight: 5,
  },
  {
    heuristic: ownTerritory,
    weight: 3,
  },
  {
    heuristic: relativeTerritory,
    weight: 10,
  },
];

function weigtedGreedyChoice(gameState: GameState, playerId: Player['id']): Action {
  const heuristic = weigh(weights);
  const choiceFunc = greedyPlayPhaseChoiceFunction(heuristic);
  return choiceFunc(gameState, playerId);
}
