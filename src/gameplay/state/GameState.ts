import { produce } from 'immer';
import { Phase } from './Phase';
import { Board, createBoard } from './Board';
import { Player } from './Player';
import { moveCardFromHandToDeck } from '../process/draw';
import { StableRandom, StableRandomState } from '@/utils/random';
import { processGameStart } from '../process/processGameStart';
import { allBoardCards } from '../process/iter';

export type GameState = {
  phase: Phase;
  players: Player[];
  playPhaseActivePlayerId: Player['id'];
  board: Board;
  rng: StableRandomState;
};

export function resetGameState(oldGameState: GameState): GameState {
  const { players } = oldGameState;
  const newPlayers = produce(players, (draft) => {
    draft.forEach((player) => {
      // un-mark as done with mulligan
      player.phase.setup.done = false;
      // un-mark as request rematch
      player.phase.end.requestRematch = false;
      // put all cards back in decks
      player.hand.forEach((_) => {
        moveCardFromHandToDeck(player, 0);
      });
      // including cards on the board
      for (let source of allBoardCards(oldGameState)) {
        if (source.controllerPlayerId === player.id && source.card) {
          player.deck.push(source.card);
        }
      }
      // TODO: and including any destroyed cards
    });
  });
  return createInitialState(newPlayers);
}

export function createInitialState(players: Player[]): GameState {
  const board = createBoard({ width: 5, height: 3 }, { leading: players[0].id, trailing: players[1].id });
  const state: GameState = {
    phase: 'setup',
    players,
    playPhaseActivePlayerId: players[0].id,
    board,
    rng: StableRandom.init(),
  };
  return produce(state, (draft) => processGameStart(draft));
}
