import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeckSelectionStore } from './store';
import { useCardLibraryStore } from './CardLibrary/store';
import { Input } from '@/components/ui/input';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import CardDeck from './CardDeck';
import CardPreview from './CardPreview';
import CardLibrary from './CardLibrary/CardLibrary';

interface Props {
    playerDirection: string;
};
const CreatePlayer = ({ playerDirection }: Props) => {
  const {
    draftPlayerName,
    draftPlayerDeck,
    setDraftPlayerName,
    addCardToDraftPlayerDeck,
    removeCardFromDraftPlayerDeck
  } = useDeckSelectionStore(
    useShallow((state) => ({
      draftPlayerName: state.draftPlayerName,
      draftPlayerDeck: state.draftPlayerDeck,
      setDraftPlayerName: state.setDraftPlayerName,
      addCardToDraftPlayerDeck: state.addCardToDraftPlayerDeck,
      removeCardFromDraftPlayerDeck: state.removeCardFromDraftPlayerDeck,
    })));
  const {
    takeCard: removeCardFromLibrary,
    replaceCard: addCardToLibrary,
  } = useCardLibraryStore();
  const onClickLibraryCard = useCallback((card: ICard, count: number) => {
    if (count > 0) {
      removeCardFromLibrary(card);
      addCardToDraftPlayerDeck(card);
    }
  }, []);
  const onClickDeckCard = useCallback((card: ICard, count: number) => {
    if (count > 0) {
      addCardToLibrary(card);
      removeCardFromDraftPlayerDeck(card);
    }
  }, []);
  const [previewCard, setPreviewCard] = useState<ICard | null>(null);
  return (
    <div>
      <div className="flex">
        <div>
          <div>
            <Input
              placeholder={`${playerDirection} player name`}
              value={draftPlayerName}
              onChange={(e) => setDraftPlayerName(e.target.value)}
            />
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
        onClickCard={onClickLibraryCard}
        setPreviewCard={setPreviewCard}
      />
    </div>
  );
};

export default CreatePlayer;
