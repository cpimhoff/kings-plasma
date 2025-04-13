import { useShallow } from 'zustand/react/shallow';
import { useDeckSelectionStore } from './store';
import CardLibrary from './CardLibrary';
import FullCard from '@/components/Card/FullCard';

const CreatePlayer = () => {
  const [ draftPlayer, addCardToDraftPlayerDeck ] = useDeckSelectionStore(
    useShallow(state => [state.draftPlayer, state.addCardToDraftPlayerDeck]));
  return (
    <div>
      <div>
        <p>
          Enter name:
          <input></input>
        </p>
      </div>
      <div>
        <h2> deck: </h2>
        <div className="flex">
          { draftPlayer.deck.map(card => (
            <div key={card.id}>
              <FullCard {...card} />
            </div>
          )) }
        </div>
      </div>
      <div>
        <CardLibrary addCardToDeck={addCardToDraftPlayerDeck} />
      </div>
    </div>
  );
};

export default CreatePlayer;
