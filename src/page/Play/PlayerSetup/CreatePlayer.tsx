import { usePlayerSetupStore } from './store';
import PlayerDetails from './PlayerDetails';
import CardDeck from './CardDeck';
import CardLibrary from './CardLibrary';

const CreatePlayer = () => {
  const { colorCssValue } = usePlayerSetupStore((state) => state.draftPlayer);
  return (
    <div style={{
      '--player-color': colorCssValue,
    }}>
      <PlayerDetails />
      <div className="flex flex-col">
        <CardDeck />
      </div>
      <CardLibrary />
    </div>
  );
};

export default CreatePlayer;
