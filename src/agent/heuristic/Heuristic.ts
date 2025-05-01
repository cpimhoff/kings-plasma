import { GameState, Player } from '@/gameplay';

export type Heuristic = (gameState: GameState, playerId: Player['id']) => number;

export type WeightedHeuristic = {
  heuristic: Heuristic;
  weight: number;
};

export const weigh: (weights: WeightedHeuristic[]) => Heuristic = (weights) => {
  return (gameState, playerId) => {
    return weights.reduce((sum, curr) => {
      return sum + curr.weight * curr.heuristic(gameState, playerId);
    }, 0);
  };
};
