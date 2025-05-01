import { Action, GameState, Player } from '@/gameplay';

export type ChoiceFunction = (gameState: GameState, playerId: Player['id']) => Action;

export interface Agent {
  chooseAction: ChoiceFunction;
}

interface CreateAgentArgs {
  setup: ChoiceFunction;
  play: ChoiceFunction;
}
export function createAgentByPhase({ setup, play }: CreateAgentArgs): Agent {
  return {
    chooseAction: (gameState, playerId) => {
      const { phase } = gameState;
      switch (phase) {
        case 'setup':
          return setup(gameState, playerId);
        case 'play':
          return play(gameState, playerId);
        case 'end':
          return {
            type: 'rematch',
            playerId,
            rematch: true,
          };
        default:
          phase satisfies never;
          throw new Error();
      }
    },
  };
}
