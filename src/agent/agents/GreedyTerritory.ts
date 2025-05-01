import { createAgentByPhase } from '../Agent';
import { greedyPlayPhaseChoiceFunction } from '../greedy';
import { mulliganHighRankCards } from '../heuristic/setupPhase';
import { ownTerritory } from '../heuristic/playPhase';

export const GreedyTerritory = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: greedyPlayPhaseChoiceFunction(ownTerritory),
});
