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
  const { beginGame } = useGameplayStore();
  const onClickStartGame = useCallback(() => {
    submit(beginGame);
  }, []);
  return (
    <div>
      <div>
        { !bothReady && (
          <div>
            {`Player ${playerIdx} (${playerDirection}):`}
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
