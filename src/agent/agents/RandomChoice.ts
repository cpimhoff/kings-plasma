import { Agent } from '../Agent';
import { validActionsForPlayer } from '../iter';

export const RandomChoice: Agent = {
  chooseAction: (gameState, playerId) => {
    const actions = [...validActionsForPlayer(gameState, playerId)];
    const index = Math.floor(Math.random() * actions.length); // TODO factor this out with rng.ts (is StableRandom broken?)
    return actions[index];
  },
};
