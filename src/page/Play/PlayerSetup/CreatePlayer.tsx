import { CSSProperties } from 'react';
import { usePlayerSetupStore } from './PlayerSetupStore';
import PlayerDetails from './PlayerDetails';
import PlayerDeck from './PlayerDeck';
import CardLibrary from './CardLibrary';

const CreatePlayer = () => {
  const colorCssValue = usePlayerSetupStore((state) => state.draftPlayer.colorCssValue);
  return (
    <div
      style={
        {
          '--player-color': colorCssValue,
        } as CSSProperties
      }
    >
      <PlayerDetails />
      <div className="sticky top-0 mt-3">
        <PlayerDeck />
      </div>
      <div className="mt-3">
        <CardLibrary />
      </div>
    </div>
  );
};

export default CreatePlayer;
