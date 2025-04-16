import { Card } from '@/gameplay/state/Card/Card';

export default class CardMultiSet {
  private cardsById: Record<Card['id'], Card>;
  private cardCountById: Record<Card['id'], number>;

  constructor() {
    this.cardsById = {};
    this.cardCountById = {};
  }

  getCardsById() {
    return this.cardsById;
  }

  getCountById() {
    return this.cardCountById;
  }

  size() {
    return Object.values(this.cardCountById).reduce((total, curr) => total + curr, 0);
  }

  asArray({ includeZeroes = false } = {}) {
    return Object.keys(this.cardCountById)
      .filter((cardId) => includeZeroes || this.cardCountById[cardId])
      .map((cardId) => {
        const card = this.cardsById[cardId];
        const count = this.cardCountById[cardId];
        return {
          card,
          count,
        };
      });
  }

  clone() {
    const ret = new CardMultiSet();
    ret.cardCountById = { ...this.cardCountById };
    ret.cardsById = { ...this.cardsById };
    return ret;
  }

  addCard(card: Card, count = 1) {
    if (this.cardsById[card.id]) {
      this.cardCountById[card.id] += count;
    } else {
      this.cardsById[card.id] = card;
      this.cardCountById[card.id] = count;
    }
  }

  removeCard(card: Card) {
    if (this.cardCountById[card.id] > 0) {
      this.cardCountById[card.id]--;
      // leave the zeroes around in case someone wants them
    } else {
      throw new Error(`card id ${card.id} not contained in multiset`);
    }
  }

}
