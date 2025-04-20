import { CSSProperties } from 'react';
import { usePlayerSetupStore } from './store';
import PlayerDetails from './PlayerDetails';
import CardDeck from './CardDeck';
import CardLibrary from './CardLibrary';

const CreatePlayer = () => {
  const { colorCssValue } = usePlayerSetupStore((state) => state.draftPlayer);
  return (
    <div
      className="flex flex-col items-center"
      style={
        {
          '--player-color': colorCssValue,
        } as CSSProperties
      }
    >
      <PlayerDetails />
      <div className="flex flex-col">
        <CardDeck />
      </div>
      <CardLibrary />
    </div>
  );
};

export default CreatePlayer;
