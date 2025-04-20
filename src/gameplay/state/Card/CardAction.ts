import { CardDefinition } from './Card';
import { Vector2 } from '@/utils/vector';

export type CardAction =
  | CardAction.AddControlledPips
  | CardAction.AddPower
  | CardAction.ImmediatelyDestroy
  | CardAction.CreateCardForPlayer;

export namespace CardAction {
  /** Add pips or take control of the board.
   * This is the most common action in the game. */
  export type AddControlledPips = {
    id: 'addControlledPips';
    // the tiles to add pips to
    tiles: Array<Vector2>;
    // the amount of pips to add to a controlled tile; typically 1
    amount: number;
  };

  /** Change the power of cards */
  export type AddPower = {
    id: 'addPower';
    // if true, add power to this card; ignores `.tiles`
    self?: boolean;
    // if true, add power to allied cards
    allied?: boolean;
    // if true, add power to opponent cards
    opponent?: boolean;
    // if set, add power only to played cards in these relative tiles
    tiles?: Array<Vector2>;
    // the amount of power to add -- can be negative for debuffs
    amount: number;
  };

  export type ImmediatelyDestroy = {
    id: 'immediatelyDestroy';
    // if true, destroy this card (ignores `.tiles`)
    self?: boolean;
    // if true, destroy allied cards
    allied?: boolean;
    // if true, destroy opponent cards
    opponent?: boolean;
    // destroy the card at these locations
    tiles: Array<Vector2>;
  };

  /** Create a card and add it to the target player's hand. */
  export type CreateCardForPlayer = {
    id: 'createCardForPlayer';
    // the card to create
    cardDefinition: CardDefinition;
    // the player to add the card to the hand of
    player: 'allied' | 'opponent';
    // where to add the card into
    into: 'hand' | 'deck.random' | 'deck.top';
  };
}
