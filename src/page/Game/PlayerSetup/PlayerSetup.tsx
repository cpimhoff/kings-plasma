import { useMemo } from 'react';
import { usePlayerSetupStore } from './store';
import { useGameplayStore } from '@/gameplay/store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import CreatePlayer from './CreatePlayer';

const PlayerSetup = () => {
  const [ players, submit ] = usePlayerSetupStore(
    useShallow(state => [state.players, state.submit]));
  const [playerIdx, playerDirection, bothReady] = useMemo(() => {
    const idx = players.length;
    const dir = idx === 0 ? 'Left' : 'Right';
    return [idx, dir, idx === 2]
  }, [players]);
  const beginGame = useGameplayStore((state) => state.beginGame);
  const onClickStartGame = useCallback(() => {
    submit(beginGame);
  }, []);
  return (
    <div>
      <p> player setup </p>
      <div>
        { !bothReady && (
          <div>
            {`Player ${playerIdx + 1} (${playerDirection}):`}
            <CreatePlayer />
          </div>
        ) }
        { bothReady && (
          <Button onClick={() => onClickStartGame()}> Start game </Button>
        ) }
      </div>
    </div>
  );
};

export default PlayerSetup;
