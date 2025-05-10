import { createAgentByPhase } from '../Agent';
import { mulliganHighRankCards } from '../choice/mulligan';
import { greedyChoiceFunction } from '../choice/minimax';
import { WEIGHTED_HEURISTIC } from '../choice/heuristic/weights';

export const GreedyHeuristic = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: greedyChoiceFunction(WEIGHTED_HEURISTIC),
});
