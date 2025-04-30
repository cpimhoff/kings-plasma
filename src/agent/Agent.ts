import { Action, GameState, Player } from '@/gameplay';

export interface Agent {
  chooseAction(gameState: GameState, playerId: Player['id']): Action;
}
