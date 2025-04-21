import { usePlayerSetupStore } from './store';
import FullCard from '@/components/Card/FullCard';
import SelectableCardWrapper from './SelectableCardWrapper';
import { MAX_CARDS_IN_DECK } from './constants';

const CardLibrary = () => {
  const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);
  const deck = usePlayerSetupStore((s) => s.draftPlayer.deckCounts);
  const addCardToDraftPlayerDeck = usePlayerSetupStore((s) => s.addCardToDraftPlayerDeck);

  const deckSize = deck.reduce((s, c) => s + c, 0);
  const isDeckFull = deckSize >= MAX_CARDS_IN_DECK;

  return (
    <div className="flex flex-col">
      <h2> available cards </h2>
      <div className="flex flex-wrap justify-center gap-3 bg-slate-300 p-2">
        {cardLibrary.map((card, cardIdx) => {
          const numInDeck = deck[cardIdx] ?? 0;
          const maxAllowedInDeck = card.isLegendary ? 1 : 3;
          return (
            <SelectableCardWrapper
              key={cardIdx}
              count={maxAllowedInDeck - numInDeck}
              maxCount={maxAllowedInDeck}
              enabled={!isDeckFull && numInDeck < maxAllowedInDeck}
              onClick={() => addCardToDraftPlayerDeck(cardIdx)}
            >
              <FullCard card={card} color={'var(--player-color)'} className="w-60 grow" />
            </SelectableCardWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default CardLibrary;
