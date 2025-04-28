import { memo, useMemo } from 'react';
import { usePlayerSetupStore } from './store';
import { CardDefinition } from '@/gameplay';
import FullCard from '@/components/Card/FullCard';
import SelectableCardWrapper from './SelectableCardWrapper';
import { MAX_CARDS_IN_DECK } from './constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from '@/components/ui/slider';

import CardCountWrapper from './CardCountWrapper';
import { produce } from 'immer';

export default memo(function CardLibrary() {
  const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);
  const deckCardGroups = usePlayerSetupStore((s) => s.draftPlayer.deckCardGroups);
  const deckCardsById = useMemo(() => {
    return Object.assign({}, ...deckCardGroups.map((cardGroup) => {
      return {
        [cardGroup.cardDef.typeId]: cardGroup,
      };
    }));
  }, [cardLibrary, deckCardGroups]);
  const addCardToDraftPlayerDeck = usePlayerSetupStore((s) => s.addCardToDraftPlayerDeck);

  const deckSize = deckCardGroups.reduce((s, g) => s + g.count, 0);
  const isDeckFull = deckSize >= MAX_CARDS_IN_DECK;

  type Rank = CardDefinition['playRequirement'];
  type RankFilters = Record<Rank,boolean>;
  const [rankFilters, setRankFilters] = useState<RankFilters>({
    replace: true,
    1: true,
    2: true,
    3: true,
  });

  type Power = CardDefinition['power'];
  type PowerRange = [Power, Power];
  const maxPower = useMemo(() => {
    return cardLibrary.reduce((accum, curr) => {
      return Math.max(accum, curr.power);
    }, 0);
  }, [cardLibrary]);
  const [powerRange, setPowerRange] = useState<PowerRange>([0, maxPower]);

  type SortableCard = CardDefinition & {
    index: number;
  }
  type SortAttribute = 'index' | 'rank' | 'power';
  type SortDirection = 'ascending' | 'descending';
  type SortMethod = {
    attribute: SortAttribute,
    direction: SortDirection,
  };
  const [sortMethod, setSortMethod] = useState<SortMethod>({
    attribute: 'index',
    direction: 'ascending',
  });

  const serializeSortMethod = useCallback((sortMethod: SortMethod) => {
    const { attribute, direction } = sortMethod;
    return `${attribute}|${direction}`;
  }, []);
  const sortOptions = useMemo(() => {
    return ['index', 'rank', 'power'].map((attribute) => {
      return ['ascending', 'descending'].map((direction) => {
        const method = {
          attribute: attribute as SortAttribute,
          direction: direction as SortDirection,
        };
        return {
          method,
          value: serializeSortMethod(method),
          label: `${attribute} (${direction})`,
        };
      });
    }).reduce((accum, curr) => [...accum, ...curr]);
  }, []);

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

  const filteredSortedLibrary = useMemo(() => {
    return cardLibrary
      .map((c, i) => ({
        ...c,
        index: i,
      }))
      .filter((cardDef) => {
        const rank = cardDef.playRequirement;
        const passesRankFilter = rankFilters[rank];
        const power = cardDef.power;
        const passesPowerFilter = power >= powerRange[0] && power <= powerRange[1];
        return passesRankFilter && passesPowerFilter;
      })
      .sort(sortFunction);
  }, [cardLibrary, rankFilters, powerRange, sortFunction]);

  return (
    <div className="flex flex-col bg-slate-300 p-2">
      <div className="flex justify-between">
        available cards
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Filter</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <div>
                <DropdownMenuLabel><b>Rank</b></DropdownMenuLabel>
                  { (Object.keys(rankFilters) as Array<Rank>).map((rank) => (
                    <DropdownMenuCheckboxItem
                      key={rank}
                      checked={rankFilters[rank]}
                      onCheckedChange={() => setRankFilters(produce(rankFilters, (rf) => {
                        rf[rank] = !rf[rank];
                      }))}
                    >
                      { rank }
                    </DropdownMenuCheckboxItem>
                  ))}
              </div>
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel><b>Power (0-{maxPower})</b></DropdownMenuLabel>
                <div className="flex">
                  <span className="mx-2"> { powerRange[0]} </span>
                  <Slider
                    min={0}
                    max={maxPower}
                    step={1}
                    value={powerRange}
                    onValueChange={(value) => setPowerRange(value as PowerRange)}
                  />
                  <span className="mx-2"> { powerRange[1] } </span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Sort</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuRadioGroup
                value={serializeSortMethod(sortMethod)}
                onValueChange={(newValue) => {
                  const [ attribute, direction ] = newValue.split('|');
                  setSortMethod({
                    attribute,
                    direction,
                  } as SortMethod);
                }}
              >
                { sortOptions.map((sortOption) => {
                  return (
                    <DropdownMenuRadioItem key={sortOption.value} value={sortOption.value}>{sortOption.label}</DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
    </div>
  );
});

function getOrdinalForPlayRequirement(pr: CardDefinition['playRequirement']) {
  if (pr === 'replace') {
    return 0;
  }
  return pr;
}