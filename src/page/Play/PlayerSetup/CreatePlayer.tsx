import { CSSProperties } from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerDeck from './PlayerDeck';
import CardLibrary from './CardLibrary';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { Player } from '@/gameplay';
import { CardWrapperProps } from './LibraryCardView';
import SelectableCardWrapper from './SelectableCardWrapper';
import CardCountWrapper from './CardCountWrapper';
import { MAX_CARDS_IN_DECK } from '@/gameplay/constants';

interface Props {
  onSubmit: (p: Player) => void;
}

export default function CreatePlayer({ onSubmit }: Props) {
  const colorCssValue = useCreatePlayerStore((state) => state.draftPlayer.colorCssValue);
  return (
    <div
      style={
        {
          '--player-color': colorCssValue,
        } as CSSProperties
      }
    >
      <PlayerDetails onSubmit={onSubmit} />
      <div className="sticky top-0 mt-3">
        <PlayerDeck />
      </div>
      <div className="mt-3">
        <CardLibrary CardWrapper={SelectableCardCountWrapper} />
      </div>
    </div>
  );
}

function SelectableCardCountWrapper({ card, children }: CardWrapperProps) {
  const deckCardGroups = useCreatePlayerStore((s) => s.draftPlayer.deckCardGroups);
  const deckCardsById = useMemo(() => {
    return Object.assign(
      {},
      ...deckCardGroups.map((cardGroup) => {
        return {
          [cardGroup.cardDef.typeId]: cardGroup,
        };
      }),
    );
  }, [deckCardGroups]);
  const deckSize = deckCardGroups.reduce((s, g) => s + g.count, 0);
  const isDeckFull = deckSize >= MAX_CARDS_IN_DECK;
  const addCardToDraftPlayerDeck = useCreatePlayerStore((s) => s.addCardToDraftPlayerDeck);

  const deckCardGroup = deckCardsById[card.typeId];
  const numInDeck = deckCardGroup?.count ?? 0;
  const maxAllowedInDeck = card.isLegendary ? 1 : 3;
  return (
    <SelectableCardWrapper
      enabled={!isDeckFull && numInDeck < maxAllowedInDeck}
      onClick={() => addCardToDraftPlayerDeck(card)}
    >
      <CardCountWrapper count={maxAllowedInDeck - numInDeck} maxCount={maxAllowedInDeck} className="w-60 grow">
        {children}
      </CardCountWrapper>
    </SelectableCardWrapper>
  );
}
