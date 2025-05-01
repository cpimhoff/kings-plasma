import { useState } from 'react';
import SelectableCardWrapper from './SelectableCardWrapper';
import DeckCard from './DeckCard';
import SaveLoadDeck from './SaveLoadDeck';
import FullCard from '@/components/Card/FullCard';
import { Popover } from '@/components/ui/popover';
import { MAX_CARDS_IN_DECK } from '@/gameplay/constants';
import CardCountWrapper from './CardCountWrapper';
import { CardDefinition } from '@/gameplay';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { HydratedCardGroup } from '@/deck';

const PlayerDeck = () => {
  const deckCardGroups = useCreatePlayerStore((s) => s.draftPlayer.deckCardGroups);
  const removeCardFromDraftPlayerDeck = useCreatePlayerStore((s) => s.removeCardFromDraftPlayerDeck);

  const deckSize = deckCardGroups.reduce((s, c) => s + c.count, 0);

  const [previewCard, setPreviewCard] = useState<CardDefinition | null>(null);

  const handleClickCard = useCallback((cardGroup: HydratedCardGroup) => {
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
      <div className="flex h-58 w-full flex-col items-center">
        <div className="relative z-0 flex w-full gap-3 overflow-x-auto p-2">
          {deckCardGroups.map((cardGroup) => {
            return (
              <SelectableCardWrapper
                key={cardGroup.cardDef.typeId}
                onClick={() => handleClickCard(cardGroup)}
                onHoverIn={() => setPreviewCard(cardGroup.cardDef)}
                onHoverOut={() => setPreviewCard(null)}
                className="h-50 w-40 shrink-0"
              >
                <CardCountWrapper count={cardGroup.count} className="grow">
                  <DeckCard card={cardGroup.cardDef} color={'var(--player-color)'} />
                </CardCountWrapper>
              </SelectableCardWrapper>
            );
          })}
        </div>
        {previewCard !== null && (
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
