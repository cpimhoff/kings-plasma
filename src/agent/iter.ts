import { Action, GameState, getPlayerWithId, Player } from '@/gameplay';
import { MAX_CARDS_TO_MULLIGAN } from '@/gameplay/constants';
import { allBoardTiles } from '@/gameplay/process/iter';
import { canPlayerPlaceCardAtTile } from '@/gameplay/validation';

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
      yield* validEndPhaseActionsForPlayer(playerId);
      break;
    default:
      phase satisfies never;
      break;
  }
}

export function* validSetupPhaseActionsForPlayer(gameState: GameState, playerId: Player['id']): Generator<Action> {
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
  const prevEndIndex = prefix[prefix.length - 1] ?? -1; // if prefix is empty, start at index 0
  const startIndex = prevEndIndex + 1;
  for (let handIndex = startIndex; handIndex < handSize; handIndex++) {
    yield* validMulligansWithPrefix([...prefix, handIndex], handSize, playerId);
  }
}

export function* validPlayPhaseActionsForPlayer(gameState: GameState, playerId: Player['id']): Generator<Action> {
  yield {
    type: 'pass',
    playerId,
  };
  const player = getPlayerWithId(gameState.players, playerId);
  const { hand } = player;
  for (let handIndex = 0; handIndex < hand.length; handIndex++) {
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

function* validEndPhaseActionsForPlayer(playerId: Player['id']): Generator<Action> {
  return [true, false].map((rematch) => {
    return {
      type: 'rematch',
      playerId,
      rematch,
    };
  })[Symbol.iterator];
}
