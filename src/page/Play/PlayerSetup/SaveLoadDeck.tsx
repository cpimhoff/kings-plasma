import { useMemo, useCallback, useState, CSSProperties } from 'react';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePlayerSetupStore } from './PlayerSetupStore';
import { useDeckStorage, StoredDeck } from './storage';
import DeckCard from './DeckCard';
import CardCountWrapper from './CardCountWrapper';
import { CardDefinition } from '@/gameplay';
import { MIN_CARDS_IN_DECK } from '@/gameplay/constants';

export default function SaveLoadDeck() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save/Load</Button>
      </DialogTrigger>
      <DialogContent className="min-w-300">
        <DialogHeader>
          <DialogTitle>Save or load decks</DialogTitle>
        </DialogHeader>
        <StoredDecks />
      </DialogContent>
    </Dialog>
  );
}

function StoredDecks() {
  const colorCssValue = usePlayerSetupStore((state) => state.draftPlayer.colorCssValue);

  const { storedDecks, saveDeckToLocalStorage, deleteStoredDeck } = useDeckStorage();

  // save current deck
  const currentDeckCardGroups = usePlayerSetupStore((store) => store.draftPlayer.deckCardGroups);
  const [deckName, setDeckName] = useState<string | null>(null);
  const isValidDeck = useMemo(() => {
    const isValidName = !!deckName && !storedDecks.some((deck) => deck.name === deckName);
    const deckSize = currentDeckCardGroups.reduce((s, g) => s + g.count, 0);
    return isValidName && deckSize > MIN_CARDS_IN_DECK;
  }, [deckName, currentDeckCardGroups]);
  const handleSaveCurrentDeck = useCallback(() => {
    if (isValidDeck) {
      const storedDeck = {
        name: deckName!,
        cardGroups: currentDeckCardGroups.map((cardGroup) => ({
          cardTypeId: cardGroup.cardDef.typeId,
          count: cardGroup.count,
        })),
      };
      saveDeckToLocalStorage(storedDeck);
    }
  }, [isValidDeck, deckName, currentDeckCardGroups]);

  // delete stored deck
  const handleDeleteDeck = useCallback((deckName: string) => {
    deleteStoredDeck(deckName);
  }, []);

  // load stored deck
  const replaceDraftPlayerDeck = usePlayerSetupStore((store) => store.replaceDraftPlayerDeck);
  const cardLibrary = usePlayerSetupStore((store) => store.cardLibrary);
  const allCardDefsById = useMemo(
    () =>
      Object.assign(
        {},
        ...cardLibrary.map((cardDef) => ({
          [cardDef.typeId]: cardDef,
        })),
      ),
    [cardLibrary],
  );
  const handleLoadDeck = useCallback(
    (storedDeck: StoredDeck) => {
      const deckCardGroups = storedDeck.cardGroups.map((storedCardGroup) => {
        const cardDef = allCardDefsById[storedCardGroup.cardTypeId];
        return {
          cardDef,
          count: storedCardGroup.count,
        };
      });
      replaceDraftPlayerDeck(deckCardGroups);
    },
    [allCardDefsById],
  );

  return (
    <div style={{ '--player-color': colorCssValue } as CSSProperties}>
      <div className="flex">
        <Button disabled={!isValidDeck} onClick={handleSaveCurrentDeck}>
          Save current deck
        </Button>
        <Input
          className="w-80"
          placeholder="Enter a name"
          value={deckName || ''}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>
      <div>
        Saved decks:
        <div>
          {storedDecks.map((deck) => (
            <DeckPreview
              key={deck.name}
              deck={deck}
              allCardDefsById={allCardDefsById}
              onLoad={(deck) => handleLoadDeck(deck)}
              onDelete={(deckName) => handleDeleteDeck(deckName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DeckPreviewProps {
  deck: StoredDeck;
  allCardDefsById: Record<CardDefinition['typeId'], CardDefinition>;
  onLoad: (deck: StoredDeck) => void;
  onDelete: (name: string) => void;
}
function DeckPreview({ deck, allCardDefsById, onLoad, onDelete }: DeckPreviewProps) {
  return (
    <div className="flex">
      <div className="flex flex-col">
        {deck.name}
        <Button onClick={() => onLoad(deck)}>Load</Button>
        <Button onClick={() => onDelete(deck.name)}>Delete</Button>
      </div>
      <div className="flex">
        {deck.cardGroups.map(({ cardTypeId, count }) => {
          const cardDef = allCardDefsById[cardTypeId];
          return (
            <CardCountWrapper key={cardTypeId} count={count} className="w-30">
              <DeckCard card={cardDef} color={'var(--player-color)'} />
            </CardCountWrapper>
          );
        })}
      </div>
    </div>
  );
}
