import { Vector2 } from '@/utils/vector';
import { CardDefinition } from './Card';
import { CardEffectFilters, TileSelector } from './CardEffectFilters';

export type CardAction =
  | CardAction.AddControlledPips
  | CardAction.AddPower
  | CardAction.ImmediatelyDestroy
  | CardAction.CreateCardForPlayer
  | CardAction.AddScoreBonusForPlayer
  | CardAction.FoldRowScores
  | CardAction.SpawnCardsOnCapturedTiles;

type CardActionTileSelector = TileSelector & {
  // match the card that emitted the event that triggered us
  eventSource?: boolean;
};

export type CardActionFilters = CardEffectFilters & {
  onlyTiles?: CardActionTileSelector;
  excludeTiles?: CardActionTileSelector;
};

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
  export type AddPower = CardActionFilters & {
    id: 'addPower';
    // the amount of power to add -- can be negative for debuffs
    amount: number;
    // if set, scale the amount by the number of cards on the board that match these filters
    scaleBy?: Omit<CardEffectFilters, 'self'> | 'replaced';
  };

  /** Destroys the card(s) that match the filters. */
  export type ImmediatelyDestroy = CardActionFilters & {
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

  /** For each lane, add's the loser's row score to the winner's score bonus. */
  export type FoldRowScores = {
    id: 'foldRowScores';
  };

  /** Creates cards on the board for the current player at empty captured positions based on the number of pips. */
  export type SpawnCardsOnCapturedTiles = {
    id: 'spawnCardsOnCapturedTiles';
    // mapping between number of pips on a tile and what card definition to use when spawning a card there
    cardDefByRank: Record<number, CardDefinition>;
  };
}
