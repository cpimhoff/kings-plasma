import { useState } from 'react';
import { DeckCardGroup, usePlayerSetupStore } from './store';
import SelectableCardWrapper from './SelectableCardWrapper';
import DeckCard from './DeckCard';
import SaveLoadDeck from './SaveLoadDeck';
import FullCard from '@/components/Card/FullCard';
import { Popover } from '@/components/ui/popover';
import { MAX_CARDS_IN_DECK } from './constants';
import CardCountWrapper from './CardCountWrapper';
import { CardDefinition } from '@/gameplay';

const PlayerDeck = () => {
  const deckCardGroups = usePlayerSetupStore((s) => s.draftPlayer.deckCardGroups);
  const removeCardFromDraftPlayerDeck = usePlayerSetupStore((s) => s.removeCardFromDraftPlayerDeck);

  const deckSize = deckCardGroups.reduce((s, c) => s + c.count, 0);

  const [previewCard, setPreviewCard] = useState<CardDefinition | null>(null);

  const handleClickCard = useCallback((cardGroup: DeckCardGroup) => {
    removeCardFromDraftPlayerDeck(cardGroup.cardDef.typeId);
    setPreviewCard(null);
  }, []);

  return (
    <div className="w-full bg-slate-300 p-3">
      <div className="flex justify-between">
        <span>
          deck ({deckSize}/{MAX_CARDS_IN_DECK}){' '}
        </span>
        <SaveLoadDeck />
      </div>
      <div className="flex flex-col items-center w-full h-58">
        <div className="flex w-full gap-3 p-2 relative z-0 overflow-x-auto">
          {deckCardGroups.map(
            (cardGroup) => {
              return (
                <SelectableCardWrapper
                  key={cardGroup.cardDef.typeId}
                  onClick={() => handleClickCard(cardGroup)}
                  onHoverIn={() => setPreviewCard(cardGroup.cardDef)}
                  onHoverOut={() => setPreviewCard(null)}
                  className="shrink-0 h-50 w-40"
                >
                  <CardCountWrapper count={cardGroup.count}>
                    <DeckCard
                      card={cardGroup.cardDef}
                      color={'var(--player-color)'}
                    />
                  </CardCountWrapper>
                </SelectableCardWrapper>
              );
            }
          )}
        </div>
        { previewCard !== null && (
          <div className="relative -left-30">
            <Popover>
              <FullCard card={previewCard} color={'var(--player-color)'} className="absolute z-50 w-60" />
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDeck;
