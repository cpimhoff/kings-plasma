import { useMemo } from 'react';
import { usePlayerSetupStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import CardLibrary from './CardLibrary';
import CardDeck from './CardDeck';
import { MIN_CARDS_IN_DECK, MAX_CARDS_IN_DECK } from './constants';

const CreatePlayer = () => {
  const {
    players,
    draftPlayer,
    setDraftPlayerName,
    addPlayerFromDraft,
  } = usePlayerSetupStore(
    useShallow((state) => ({
      players: state.players,
      draftPlayer: state.draftPlayer,
      setDraftPlayerName: state.setDraftPlayerName,
      addPlayerFromDraft: state.addPlayerFromDraft,
    })));

  const {
    deck: draftPlayerDeck,
    name: draftPlayerName,
    colorCssValue: color,
  } = draftPlayer;
  const deckSize = useMemo(() => draftPlayerDeck.size(), [draftPlayerDeck]);

  const [playerIdx, playerDirection] = useMemo(() => {
    const idx = players.length;
    const dir = idx === 0 ? 'Left' : 'Right';
    return [idx, dir];
  }, [players]);

  const isValid = useMemo(() => {
    return deckSize >= MIN_CARDS_IN_DECK
      && deckSize <= MAX_CARDS_IN_DECK
      && !!draftPlayerName;
  }, [deckSize, draftPlayerName]);

  return (
    <div>
      {`Player ${playerIdx + 1} (${playerDirection}):`}
      <div className="flex flex-col">
        <div className="flex">
          Name:
          <Input
            className="max-w-70"
            placeholder="Player name"
            value={draftPlayerName}
            onChange={(e) => setDraftPlayerName(e.target.value)}
          />
          <div className="w-10 h-10" style={{ backgroundColor: color }}/>
          <Button className="mr-4" disabled={!isValid} onClick={() => addPlayerFromDraft()}> Done </Button>
        </div>
        <CardDeck />
      </div>
      <CardLibrary />
    </div>
  );
};

export default CreatePlayer;
