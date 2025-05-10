import { Heuristic } from './Heuristic';
import { defeat, ownScore, ownTerritory, relativeTerritory, victory } from './playPhaseHeuristics';

type WeightedHeuristic = {
  heuristic: Heuristic;
  weight: number;
};

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

export const WEIGHTED_HEURISTIC = weigh(weights);

function weigh(weights: WeightedHeuristic[]): Heuristic {
  return (gameState, playerId) => {
    return weights.reduce((sum, curr) => {
      return sum + curr.weight * curr.heuristic(gameState, playerId);
    }, 0);
  };
}
