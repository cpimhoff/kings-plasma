import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeckSelectionStore } from './store';
import { Card as ICard } from '@/gameplay/state/Card/Card';
import CardDeck from './CardDeck';
import CardPreview from './CardPreview';
import CardLibrary from './CardLibrary';

const CreatePlayer = () => {
  const [ draftPlayerDeck, addCardToDraftPlayerDeck ] = useDeckSelectionStore(
    useShallow(state => [state.draftPlayerDeck, state.addCardToDraftPlayerDeck]));
  const [previewCard, setPreviewCard] = useState<ICard | null>(null);
  return (
    <div>
      <div className="flex">
        <div>
          <div>
            Enter name: <input></input>
          </div>
          <CardDeck draftPlayerDeck={draftPlayerDeck} />
        </div>
        <CardPreview previewCard={previewCard} />
      </div>
      <CardLibrary
          addCardToDeck={addCardToDraftPlayerDeck}
          setPreviewCard={setPreviewCard}
      />
    </div>
  );
};

export default CreatePlayer;
