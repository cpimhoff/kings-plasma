import { useState } from 'react';
import { usePlayerSetupStore } from './store';
import SelectableCardWrapper from './SelectableCardWrapper';
import DeckCard from './DeckCard';
import FullCard from '@/components/Card/FullCard';
import { Popover } from '@/components/ui/popover';
import { MAX_CARDS_IN_DECK } from './constants';

const CardDeck = () => {
  const deck = usePlayerSetupStore((s) => s.draftPlayer.deckCounts);
  const removeCardFromDraftPlayerDeck = usePlayerSetupStore((s) => s.removeCardFromDraftPlayerDeck);
  const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);

  const deckSize = deck.reduce((s, c) => s + c, 0);

  const [previewCardIdx, setPreviewCardIdx] = useState<number | null>(null);

  return (
    <div className="w-full bg-slate-300 p-3">
      <h2>
        {' '}
        deck ({deckSize}/{MAX_CARDS_IN_DECK}){' '}
      </h2>
      <div className="flex flex-col items-center w-full h-58">
        <div className="flex w-full gap-3 p-2 relative z-0 overflow-x-auto">
          {deck.map(
            (count, cardIdx) =>
              count > 0 && (
                <SelectableCardWrapper
                  key={cardIdx}
                  count={count}
                  onClick={() => removeCardFromDraftPlayerDeck(cardIdx)}
                  onHoverIn={() => setPreviewCardIdx(cardIdx)}
                  onHoverOut={() => setPreviewCardIdx(null)}
                  className="shrink-0 h-50 w-40"
                >
                  <DeckCard
                    card={cardLibrary[cardIdx]}
                    color={'var(--player-color)'}
                  />
                </SelectableCardWrapper>
              ),
          )}
        </div>
        { previewCardIdx !== null && (
          <div className="relative -left-30">
            <Popover>
              <FullCard card={cardLibrary[previewCardIdx]} color={'var(--player-color)'} className="absolute z-50 w-60" />
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDeck;
