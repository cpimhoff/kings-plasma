import PlayerDetails from './PlayerDetails';
import CardDeck from './CardDeck';
import CardLibrary from './CardLibrary';

const CreatePlayer = () => {
  return (
    <div>
      <PlayerDetails />
      <div className="flex flex-col">
        <CardDeck />
      </div>
      <CardLibrary />
    </div>
  );
};

export default CreatePlayer;
