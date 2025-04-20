import { GameState } from '..';
import { drawCardToHand } from './draw';
import { nextStableShuffle } from './rng';

export function processGameStart(state: GameState) {
  state.phase = 'setup';

  // shuffle each player's deck
  state.players.forEach((player) => {
    player.deck = nextStableShuffle(state, player.deck);
  });

  // draw 5 cards to each player's hand from their deck
  for (let i = 0; i < 5; i++) {
    state.players.forEach((player) => {
      drawCardToHand(player);
    });
  }
}
