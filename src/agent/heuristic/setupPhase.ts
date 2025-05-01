import { Action, CardDefinition, GameState, getPlayerWithId, Player } from '@/gameplay';

export function mulliganHighRankCards(gameState: GameState, playerId: Player['id']): Action {
  const { hand } = getPlayerWithId(gameState.players, playerId);
  const handIndexesAndRanks = hand.map((card, handIndex) => {
    return {
      handIndex,
      rank: getOrdinalForRank(card.playRequirement),
    };
  });
  const sortedByRankDescending = handIndexesAndRanks.sort((c1, c2) => {
    return c1.rank - c2.rank;
  });
  const highestRankHandIndexes = sortedByRankDescending.splice(0, 3).map(({ handIndex }) => handIndex);
  return {
    type: 'mulligan',
    playerId,
    handIndexes: highestRankHandIndexes,
  };
}

function getOrdinalForRank(rank: CardDefinition['playRequirement']): number {
  return rank === 'replace' ? 4 : rank;
}
