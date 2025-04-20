import { useCallback } from 'react';
import { usePlayerSetupStore } from './store';
import { useGameplayStore } from '@/gameplay/store';
import { useShallow } from 'zustand/react/shallow';
import CreatePlayer from './CreatePlayer';
import { Button } from '@/components/ui/button';

const PlayerSetup = () => {
  const { players } = usePlayerSetupStore(
    useShallow((state) => ({
      players: state.players,
    })),
  );

  const beginGame = useGameplayStore((state) => state.beginGame);

  const onClickStart = useCallback(() => {
    beginGame(players);
  }, [players]);

  return (
    <div className="mx-40">
      {players.length < 2 ? (
        <CreatePlayer />
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Button onClick={() => onClickStart()}>Start</Button>
        </div>
      )}
    </div>
  );
};

export default PlayerSetup;
