import { useCallback } from 'react';
import { useDeckSelectionStore } from './store';
import { Button } from '@/components/ui/button';
import CreatePlayer from './CreatePlayer';

const DeckSelection = () => {
  const { draftPlayer } = useDeckSelectionStore();
  const clickNext = useCallback(() => {
  }, []);
  return (
    <div>
      <h1>deck selection</h1>
      <div>
        <CreatePlayer {...draftPlayer} />
      </div>
      <div>
        <Button onClick={clickNext}> Next </Button>
      </div>
    </div>
  );
};

export default DeckSelection;
