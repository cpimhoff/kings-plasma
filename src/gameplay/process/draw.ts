import { Card, Player } from "../state";

export function drawCardToHand(player: Player): Card | null {
  const nextCard = player.deck.pop();
  if (!nextCard) return null;

  player.hand.push(nextCard);
  return nextCard;
}

export function discardCardFromHand(
  player: Player,
  cardIndex: number,
): Card | null {
  const card = player.hand[cardIndex];
  if (!card) return null;
  player.hand.splice(cardIndex, 1);
  return card;
}

export function moveCardFromHandToDeck(
  player: Player,
  cardIndex: number,
): void {
  const card = discardCardFromHand(player, cardIndex);
  if (card) {
    player.deck.push(card);
  }
}
