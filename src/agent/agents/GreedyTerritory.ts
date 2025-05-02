import { createAgentByPhase } from '../Agent';
import { greedyChoiceFunction } from '../choice/minimax';
import { mulliganHighRankCards } from '../choice/mulligan';
import { ownTerritory } from '../choice/heuristic/playPhaseHeuristics';

export const GreedyTerritory = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: greedyChoiceFunction(ownTerritory),
});
