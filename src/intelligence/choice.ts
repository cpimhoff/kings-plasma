import { Action, GameState, Player } from "@/gameplay";
import { validActionsForPlayer } from "./iter";

export function chooseAction(gameState: GameState, playerId: Player['id']): Action {
    // naive algorithm: choose randomly!
    const actions = [...validActionsForPlayer(gameState, playerId)];
    const index = Math.floor(Math.random() * actions.length); // TODO factor this out with rng.ts (is StableRandom broken?)
    return actions[index];
}