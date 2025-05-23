import { createAgentByPhase } from '../Agent';
import { mulliganHighRankCards } from '../choice/mulligan';
import { ownScore } from '../choice/heuristic/playPhaseHeuristics';
import { greedyChoiceFunction } from '../choice/minimax';

export const GreedyScore = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: greedyChoiceFunction(ownScore),
});
