import { CSSProperties } from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerDeck from './PlayerDeck';
import CardLibrary from './CardLibrary';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { Player } from '@/gameplay';

interface Props {
  onSubmit: (p: Player) => void;
}

export default function CreatePlayer({ onSubmit }: Props) {
  const colorCssValue = useCreatePlayerStore((state) => state.draftPlayer.colorCssValue);
  return (
    <div
      style={
        {
          '--player-color': colorCssValue,
        } as CSSProperties
      }
    >
      <PlayerDetails onSubmit={onSubmit} />
      <div className="sticky top-0 mt-3">
        <PlayerDeck />
      </div>
      <div className="mt-3">
        <CardLibrary />
      </div>
    </div>
  );
}
