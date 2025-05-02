import { Agent, createAgentByPhase } from '../Agent';
import { WEIGHTED_HEURISTIC } from '../choice/heuristic/weights';
import { maxDepthMinimaxChoiceFunction } from '../choice/minimax';
import { mulliganHighRankCards } from '../choice/mulligan';

export const MinimaxThreeHeuristic: Agent = createAgentByPhase({
  setup: mulliganHighRankCards,
  play: maxDepthMinimaxChoiceFunction(WEIGHTED_HEURISTIC, 3),
});
