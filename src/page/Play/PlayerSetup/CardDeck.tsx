import { useState } from 'react';
import { usePlayerSetupStore } from './store';
import { CardDefinition } from '@/gameplay/state';
import SelectableCardWrapper from './SelectableCardWrapper';
import DeckCard from './DeckCard';
import FullCard from '@/components/Card/FullCard';
import { MAX_CARDS_IN_DECK } from './constants';

const CardDeck = () => {
  const deck = usePlayerSetupStore((s) => s.draftPlayer.deckCounts);
  const removeCardFromDraftPlayerDeck = usePlayerSetupStore((s) => s.removeCardFromDraftPlayerDeck);
  const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);

  const deckSize = deck.reduce((s, c) => s + c, 0);

  const [previewCard, setPreviewCard] = useState<CardDefinition | null>(null);
  return (
    <div>
      <h2>
        {' '}
        deck ({deckSize}/{MAX_CARDS_IN_DECK}){' '}
      </h2>
      <div className="flex w-full justify-between">
        <div className="flex min-h-110 w-250 flex-wrap gap-3 bg-slate-300 p-2">
          {deck.map(
            (count, cardIdx) =>
              count > 0 && (
                <SelectableCardWrapper
                  key={cardIdx}
                  count={count}
                  onClick={() => removeCardFromDraftPlayerDeck(cardIdx)}
                  onHoverIn={() => setPreviewCard(cardLibrary[cardIdx])}
                  onHoverOut={() => setPreviewCard(null)}
                  className="h-50 w-40"
                >
                  <DeckCard card={cardLibrary[cardIdx]} color={'var(--player-color)'} />
                </SelectableCardWrapper>
              ),
          )}
        </div>
        <div className="m-auto flex w-100 flex-col items-center">
          {previewCard && <FullCard card={previewCard} color={'var(--player-color)'} />}
        </div>
      </div>
    </div>
  );
};

export default CardDeck;
