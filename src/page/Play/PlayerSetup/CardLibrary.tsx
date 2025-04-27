import { memo, useMemo } from 'react';
import { usePlayerSetupStore } from './store';
import FullCard from '@/components/Card/FullCard';
import SelectableCardWrapper from './SelectableCardWrapper';
import { MAX_CARDS_IN_DECK } from './constants';
import CardCountWrapper from './CardCountWrapper';

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

  return (
    <div className="flex flex-col bg-slate-300 p-2">
      <h2> available cards </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {cardLibrary.map((card) => {
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
