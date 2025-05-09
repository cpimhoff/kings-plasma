import { Player } from '@/gameplay/state/Player';
import { CardDefinition } from '@/gameplay/state/Card';
import { BoardTile } from '@/gameplay/state/Board';

export function canPlayerPlaceCardAtTile(player: Player, card: CardDefinition, tile: BoardTile) {
  if (tile.controllerPlayerId !== player.id) return false;
  if (typeof card.playRequirement === 'number') {
    if (tile.pips < card.playRequirement) return false;
  } else {
    if (tile.card === null) return false;
  }
  return true;
}
