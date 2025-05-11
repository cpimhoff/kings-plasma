import { Vector2 } from '@/utils/vector';
import { CardDefinition } from './Card';
import { CardEffectFilters } from './CardEffectFilters';

export type CardAction =
  | CardAction.AddControlledPips
  | CardAction.AddPower
  | CardAction.ImmediatelyDestroy
  | CardAction.CreateCardForPlayer
  | CardAction.AddScoreBonusForPlayer;

export namespace CardAction {
  /** Add pips or take control of the board.
   * This is the most common action in the game. */
  export type AddControlledPips = {
    id: 'addControlledPips';
    // where to add the pips, relative to the current card
    tiles: Array<Vector2>;
    // the amount of pips to add to a controlled tile; typically 1
    amount: number;
  };

  /** Change the power of cards */
  export type AddPower = CardEffectFilters & {
    id: 'addPower';
    // the amount of power to add -- can be negative for debuffs
    amount: number;
    // if set, scale the amount by the number of cards on the board that match these filters
    scaleBy?: Omit<CardEffectFilters, 'self'> | 'replaced';
  };

  /** Destroys the card(s) that match the filters. */
  export type ImmediatelyDestroy = CardEffectFilters & {
    id: 'immediatelyDestroy';
  };

  /** Create a card and add it to the target player's hand. */
  export type CreateCardForPlayer = {
    id: 'createCardForPlayer';
    // the card to create
    cardDefinition: CardDefinition;
    // the player to add the card to the hand of
    player: 'controller' | 'opponent';
    // where to add the card into
    into: 'hand' | 'deck.random' | 'deck.top';
  };

  /** Modifies the given player's score bonus. */
  export type AddScoreBonusForPlayer = {
    id: 'addScoreBonusForPlayer';
    // the player to receive the bonus
    player: 'controller' | 'opponent';
    // the bonus amount
    amount: number;
  };
}
