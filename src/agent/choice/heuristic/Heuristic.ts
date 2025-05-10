import { GameState, Player } from '@/gameplay';

export type Heuristic = (gameState: GameState, playerId: Player['id']) => number;
