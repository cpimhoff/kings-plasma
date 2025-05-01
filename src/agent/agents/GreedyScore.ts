import { createAgentByPhase } from '../Agent';
import { mulliganHighRankCards } from '../heuristic/setupPhase';
import { ownScore } from '../heuristic/playPhase';
import { greedyPlayPhaseChoiceFunction } from '../greedy';

export const GreedyScore = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: greedyPlayPhaseChoiceFunction(ownScore),
});
