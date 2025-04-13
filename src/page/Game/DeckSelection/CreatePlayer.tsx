import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeckSelectionStore } from './store';
import { useCardLibraryStore } from './CardLibrary/store';
import { Input } from '@/components/ui/input';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import { Button } from '@/components/ui/button';
import CardDeck from './CardDeck';
import CardPreview from './CardPreview';
import CardLibrary from './CardLibrary/CardLibrary';

// TODO put this somewhere good
const MIN_CARDS_IN_DECK = 1;
const MAX_CARDS_IN_DECK = 15;

const CreatePlayer = () => {
  const {
    draftPlayerName,
    draftPlayerDeck,
    setDraftPlayerName,
    addCardToDraftPlayerDeck,
    removeCardFromDraftPlayerDeck,
    addPlayerFromDraft,
  } = useDeckSelectionStore(
    useShallow((state) => ({
      draftPlayerName: state.draftPlayerName,
      draftPlayerDeck: state.draftPlayerDeck,
      setDraftPlayerName: state.setDraftPlayerName,
      addCardToDraftPlayerDeck: state.addCardToDraftPlayerDeck,
      removeCardFromDraftPlayerDeck: state.removeCardFromDraftPlayerDeck,
      addPlayerFromDraft: state.addPlayerFromDraft,
    })));
  const deckSize = useMemo(() => draftPlayerDeck.size(), [draftPlayerDeck]);
  const {
    takeCard: removeCardFromLibrary,
    replaceCard: addCardToLibrary,
    reset: resetLibrary,
  } = useCardLibraryStore();
  const onClickLibraryCard = useCallback((card: ICard) => {
    removeCardFromLibrary(card);
    addCardToDraftPlayerDeck(card);
  }, []);
  const onClickDeckCard = useCallback((card: ICard) => {
    addCardToLibrary(card);
    removeCardFromDraftPlayerDeck(card);
  }, []);
  const isValid = useMemo(() => {
    return deckSize >= MIN_CARDS_IN_DECK
      && deckSize <= MAX_CARDS_IN_DECK
      && !!draftPlayerName;
  }, [deckSize, draftPlayerName]);
  const onSubmit = useCallback(() => {
    addPlayerFromDraft();
    resetLibrary();
  }, []);
  const [previewCard, setPreviewCard] = useState<ICard | null>(null);
  return (
    <div>
      <div className="flex">
        <div>
          <div>
            <Input
              placeholder="Player name"
              value={draftPlayerName}
              onChange={(e) => setDraftPlayerName(e.target.value)}
            />
          </div>
          <div>
            <Button disabled={!isValid} onClick={() => onSubmit()}> Next </Button>
          </div>
          <CardDeck
            draftPlayerDeck={draftPlayerDeck}
            onClickCard={onClickDeckCard}
            setPreviewCard={setPreviewCard}
          />
        </div>
        <CardPreview previewCard={previewCard} />
      </div>
      <CardLibrary
        canClickCard={deckSize < MAX_CARDS_IN_DECK}
        onClickCard={onClickLibraryCard}
        setPreviewCard={setPreviewCard}
      />
    </div>
  );
};

export default CreatePlayer;
