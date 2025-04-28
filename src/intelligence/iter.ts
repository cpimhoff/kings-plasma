import { Action, GameState, getPlayerWithId, Player } from "@/gameplay";
import { allBoardTiles } from "@/gameplay/process/iter";
import { canPlayerPlaceCardAtTile } from "@/gameplay/validation";

const MAX_CARDS_TO_MULLIGAN = 3; // TODO: unify this with mulliganStore

export function* validActionsForPlayer(gameState: GameState, playerId: Player['id']): Generator<Action> {
    const { phase } = gameState;
    switch (phase) {
        case 'setup':
            yield* validSetupPhaseActionsForPlayer(gameState, playerId);
            break;
        case 'play':
            yield* validPlayPhaseActionsForPlayer(gameState, playerId);
            break;
        case 'end':
            // TODO
            break;
        default:
            phase satisfies GameState['phase'];
            break;
    }
}

function* validSetupPhaseActionsForPlayer(gameState: GameState, playerId: Player['id']): Generator<Action> {
    const { hand } = getPlayerWithId(gameState.players, playerId);
    yield* validMulligansWithPrefix([], hand.length, playerId);
}

function* validMulligansWithPrefix(prefix: number[], handSize: number, playerId: Player['id']): Generator<Action> {
    yield {
        type: 'mulligan',
        playerId,
        handIndexes: prefix,
    };
    if (prefix.length === MAX_CARDS_TO_MULLIGAN) {
        // base case
        return;
    }
    // recursive case
    const prevEndIndex = prefix[prefix.length-1] ?? -1; // if prefix is empty, start at index 0
    const startIndex = prevEndIndex + 1;
    for (let handIndex=startIndex; handIndex<handSize; handIndex++) {
        yield* validMulligansWithPrefix([...prefix, handIndex], handSize, playerId);
    }
}

function* validPlayPhaseActionsForPlayer(gameState: GameState, playerId: Player['id']): Generator<Action> {
    yield {
        type: 'pass',
        playerId,
    };
    const player = getPlayerWithId(gameState.players, playerId);
    const { hand } = player;
    for (let handIndex=0; handIndex<hand.length; handIndex++) {
        const card = hand[handIndex];
        for (let tile of allBoardTiles(gameState)) {
            if (canPlayerPlaceCardAtTile(player, card, tile)) {
                yield {
                    type: 'playCard',
                    playerId,
                    fromHandIndex: handIndex,
                    toBoardPosition: tile.position,
                };
            }
        }
    }
}