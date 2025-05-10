import { CardDefinition, CardInstance, createCardInstance } from '@/gameplay';

export type DehydratedCardGroup = {
  cardTypeId: CardDefinition['typeId'];
  count: number;
};

export type HydratedCardGroup = {
  cardDef: CardDefinition;
  count: number;
};

export function hydrateCardGroups(
  deck: DehydratedCardGroup[],
  cardDefByCardTypeId: Record<CardDefinition['typeId'], CardDefinition>,
) {
  return deck.map(({ cardTypeId, count }) => {
    return {
      cardDef: cardDefByCardTypeId[cardTypeId],
      count,
    };
  });
}

export function toCardInstances(hydratedCardGroups: HydratedCardGroup[]): CardInstance[] {
  return hydratedCardGroups
    .map((cardGroup) => {
      return new Array(cardGroup.count).fill(0).map(() => createCardInstance(cardGroup.cardDef));
    })
    .reduce((accum, curr) => [...accum, ...curr], []);
}

export function fromCardInstances(cardInstances: CardInstance[]): HydratedCardGroup[] {
  const typeIdToIndex: Record<CardDefinition['typeId'], number> = {};
  const hydratedCardGroups: HydratedCardGroup[] = [];
  cardInstances.forEach((cardInstance) => {
    const { typeId } = cardInstance;
    const index = typeIdToIndex[typeId] ?? null;
    if (index !== null) {
      hydratedCardGroups[index].count++;
    } else {
      hydratedCardGroups.push({
        cardDef: cardInstance, // a bit annoying that we're leaving the instance properties around
        count: 1,
      });
      typeIdToIndex[typeId] = hydratedCardGroups.length - 1;
    }
  });
  return hydratedCardGroups;
}
