import { useMemo, useCallback, useState } from 'react';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDeckStorage, StoredDeck } from './DeckStorage';
import { CardDefinition } from '@/gameplay';
import { MIN_CARDS_IN_DECK } from '@/gameplay/constants';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { hydrateCardGroups } from '@/deck';
import ReadOnlyDeck from './ReadOnlyDeck';
import { useCardLibraryStore } from './CardLibraryStore';

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
  const colorCssValue = useCreatePlayerStore((state) => state.draftPlayer.colorCssValue);

  const { storedDecks, saveDeckToLocalStorage, deleteStoredDeck } = useDeckStorage();

  // save current deck
  const currentDeckCardGroups = useCreatePlayerStore((store) => store.draftPlayer.deckCardGroups);
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
  const replaceDraftPlayerDeck = useCreatePlayerStore((store) => store.replaceDraftPlayerDeck);
  const allCardDefsById = useCardLibraryStore((store) => store.cardDefByTypeId);
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
    <div>
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
              color={colorCssValue}
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
  color: string;
  onLoad: (deck: StoredDeck) => void;
  onDelete: (name: string) => void;
}
function DeckPreview({ deck, allCardDefsById, color, onLoad, onDelete }: DeckPreviewProps) {
  const hydratedCardGroups = hydrateCardGroups(deck.cardGroups, allCardDefsById);
  return (
    <div className="flex">
      <div className="max-w-250">
        {deck.name}
        <div className="overflow-x-auto">
          <ReadOnlyDeck hydratedCardGroups={hydratedCardGroups} color={color} />
        </div>
      </div>
      <div className="flex flex-col justify-center grow gap-3 mx-3">
        <Button onClick={() => onLoad(deck)}>Load</Button>
        <Button onClick={() => onDelete(deck.name)}>Delete</Button>
      </div>
    </div>
  );
}
