import FullCard from '@/components/Card/FullCard';
import { CardDefinition } from '@/gameplay';
import { useLibraryControlsStore } from './LibraryControlsStore';
import { useCardLibraryStore } from './CardLibraryStore';
import { ReactNode, useCallback, useState, useMemo, useEffect, useTransition } from 'react';

const NUM_CARDS_FOR_PREVIEW = 5;

export interface CardWrapperProps {
  card: CardDefinition;
  children: ReactNode;
}
export interface LibraryCardViewProps {
  CardWrapper: ({ card, children }: CardWrapperProps) => ReactNode;
}
export default function LibraryCardView({ CardWrapper }: LibraryCardViewProps) {
  const { rankFilters, powerRange, sortMethod } = useLibraryControlsStore();

  const sortFunction = useCallback<(c1: SortableCard, c2: SortableCard) => number>(
    (cardDef1, cardDef2) => {
      const { attribute, direction } = sortMethod;
      const flipFactor = direction === 'ascending' ? 1 : -1;
      switch (attribute) {
        case 'index':
          return (cardDef1.index - cardDef2.index) * flipFactor;
        case 'rank':
          return (
            (getOrdinalForPlayRequirement(cardDef1.playRequirement) -
              getOrdinalForPlayRequirement(cardDef2.playRequirement)) *
            flipFactor
          );
        case 'power':
          return (cardDef1.basePower - cardDef2.basePower) * flipFactor;
        default:
          attribute satisfies never;
          return 0;
      }
    },
    [sortMethod],
  );

  const deferredSortFunction = useDeferredValue(sortFunction);

  const cardLibrary = useCardLibraryStore((s) => s.cardLibrary);
  type SortableCard = CardDefinition & {
    index: number;
  };
  const indexedLibrary: SortableCard[] = useMemo(() => {
    return cardLibrary.map((cardDef, i) => ({
      ...cardDef,
      index: i,
    }));
  }, [cardLibrary]);
  const filteredSortedLibrary = useMemo(() => {
    return indexedLibrary
      .filter((cardDef) => {
        const rank = cardDef.playRequirement;
        const passesRankFilter = rankFilters[rank];
        const power = cardDef.basePower;
        const passesPowerFilter = power >= powerRange[0] && (powerRange[1] < 0 || power <= powerRange[1]);
        return passesRankFilter && passesPowerFilter;
      })
      .sort(deferredSortFunction);
  }, [indexedLibrary, rankFilters, powerRange, deferredSortFunction]);

  // it's expensive to render all the cards, so we just render a few of them first
  // and then fill in the rest below the fold while the user is seeing the initial updates
  const [hasMounted, setHasMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      setHasMounted(true);
    });
  }, []);

  const cardsToShow = useMemo(() => {
    if (!hasMounted || isPending) {
      return filteredSortedLibrary.slice(0, NUM_CARDS_FOR_PREVIEW);
    }
    return filteredSortedLibrary;
  }, [hasMounted, filteredSortedLibrary]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {cardsToShow.map((card) => {
          return (
            <CardWrapper key={card.typeId} card={card}>
              <FullCard card={card} color={'var(--player-color)'} />
            </CardWrapper>
          );
        })}
      </div>
      {isPending && <div>Loading...</div>}
    </div>
  );
}

function getOrdinalForPlayRequirement(pr: CardDefinition['playRequirement']) {
  if (pr === 'replace') {
    return 0;
  }
  return pr;
}
