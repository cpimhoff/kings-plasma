import { CardDefinition, CardInstance } from '@/gameplay';
import { uuid } from '@/utils';

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
      return new Array(cardGroup.count)
        .fill(0)
        .map(() => ({ ...cardGroup.cardDef, instanceId: uuid() as CardInstance['instanceId'] }));
    })
    .reduce((accum, curr) => [...accum, ...curr], []);
}

export function fromCardInstances(cardInstances: CardInstance[]): HydratedCardGroup[] {
  const typeIdToIndex: Record<CardDefinition['typeId'], number> = {};
  const hydratedCardGroups: HydratedCardGroup[] = [];
  cardInstances.forEach((cardInstance) => {
    const { typeId } = cardInstance;
    const index = typeIdToIndex[cardInstance.typeId] ?? null;
    if (index !== null) {
      hydratedCardGroups[index].count++;
    } else {
      hydratedCardGroups.push({
        cardDef: cardInstance, // TODO: maybe it would be better to compose these
        count: 1,
      });
      typeIdToIndex[typeId] = hydratedCardGroups.length - 1;
    }
  });
  return hydratedCardGroups;
}
