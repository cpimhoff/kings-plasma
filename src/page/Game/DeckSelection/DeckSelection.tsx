import { useMemo } from 'react';
import { useDeckSelectionStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import CreatePlayer from './CreatePlayer';

const DeckSelection = () => {
  const [ players, addPlayerFromDraft ] = useDeckSelectionStore(
    useShallow(state => [state.players, state.addPlayerFromDraft]));
  const playerDirection = useMemo(() => {
    return players.length === 0 ? 'Left' : 'Right';
  }, [players.length]);
  return (
    <div>
      <div>
        <CreatePlayer playerDirection={playerDirection} />
      </div>
      <div>
        <Button onClick={() => addPlayerFromDraft()}> Next </Button>
      </div>
    </div>
  );
};

export default DeckSelection;
