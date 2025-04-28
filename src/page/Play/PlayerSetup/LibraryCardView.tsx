import { memo } from 'react';
import FullCard from '@/components/Card/FullCard';
import { CardDefinition } from '@/gameplay';
import { usePlayerSetupStore } from './store';
import SelectableCardWrapper from './SelectableCardWrapper';
import CardCountWrapper from './CardCountWrapper';
import { MAX_CARDS_IN_DECK } from './constants';
import { useLibraryControlsStore } from './LibraryControlsStore';

const LibraryCardView = memo(() => {
    const deckCardGroups = usePlayerSetupStore((s) => s.draftPlayer.deckCardGroups);
    const deckCardsById = useMemo(() => {
        return Object.assign({}, ...deckCardGroups.map((cardGroup) => {
        return {
            [cardGroup.cardDef.typeId]: cardGroup,
        };
        }));
    }, [deckCardGroups]);
    const deckSize = deckCardGroups.reduce((s, g) => s + g.count, 0);
    const isDeckFull = deckSize >= MAX_CARDS_IN_DECK;

    const {
        rankFilters,
        powerRange,
        sortMethod,
    } = useLibraryControlsStore();

    const sortFunction = useCallback<(c1: SortableCard, c2: SortableCard) => number>((cardDef1, cardDef2) => {
        const { attribute, direction } = sortMethod;
        const flipFactor = direction === 'ascending' ? 1 : -1;
        switch (attribute) {
        case 'index':
            return (cardDef1.index - cardDef2.index) * flipFactor;
        case 'rank':
            return (getOrdinalForPlayRequirement(cardDef1.playRequirement) - getOrdinalForPlayRequirement(cardDef2.playRequirement)) * flipFactor;
        case 'power':
            return (cardDef1.power - cardDef2.power) * flipFactor;
        default:
            attribute satisfies never;
            return 0;
        }
    }, [sortMethod]);

    const deferredSortFunction = useDeferredValue(sortFunction);

    const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);
    type SortableCard = CardDefinition & {
        index: number;
    }
    const indexedLibrary: SortableCard[] = useMemo(() => {
        return cardLibrary
        .map((cardDef, i) => ({
            ...cardDef,
            index: i,
        }));
    }, [cardLibrary]);
    const filteredSortedLibrary = useMemo(() => {
        return indexedLibrary
        .filter((cardDef) => {
            const rank = cardDef.playRequirement;
            const passesRankFilter = rankFilters[rank];
            const power = cardDef.power;
            const passesPowerFilter = power >= powerRange[0] && (powerRange[1] < 0 || power <= powerRange[1]);
            return passesRankFilter && passesPowerFilter;
        })
        .sort(deferredSortFunction);
    }, [indexedLibrary, rankFilters, powerRange, deferredSortFunction]);
        
    const addCardToDraftPlayerDeck = usePlayerSetupStore((s) => s.addCardToDraftPlayerDeck);

    return (
        <div className="flex flex-wrap justify-center gap-3">
            {filteredSortedLibrary.map((card) => {
                const deckCardGroup = deckCardsById[card.typeId];
                const numInDeck = deckCardGroup?.count ?? 0;
                const maxAllowedInDeck = card.isLegendary ? 1 : 3;
                return (
                    <SelectableCardWrapper
                        key={card.typeId}
                        enabled={!isDeckFull && numInDeck < maxAllowedInDeck}
                        onClick={() => addCardToDraftPlayerDeck(card)}
                    >
                    <CardCountWrapper
                        count={maxAllowedInDeck - numInDeck}
                        maxCount={maxAllowedInDeck}
                    >
                        <FullCard card={card} color={'var(--player-color)'} className="w-60 grow" />
                    </CardCountWrapper>
                    </SelectableCardWrapper>
                );
            })}
        </div>
    );
});

function getOrdinalForPlayRequirement(pr: CardDefinition['playRequirement']) {
  if (pr === 'replace') {
    return 0;
  }
  return pr;
}
export default LibraryCardView;