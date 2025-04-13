import { useCallback } from 'react';
import { useDeckSelectionStore } from './store';
import { Button } from '@/components/ui/button';
import CreatePlayer from './CreatePlayer';

const DeckSelection = () => {
  const players = useDeckSelectionStore(state => state.players);
  return (
    <div>
      <h1>deck selection</h1>
      <div>
        <CreatePlayer />
      </div>
      <div>
        <Button onClick={() => null}> Next </Button>
      </div>
    </div>
  );
};

export default DeckSelection;
