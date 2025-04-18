import { usePlayerSetupStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { CirclePicker, ColorResult } from 'react-color';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MIN_CARDS_IN_DECK, MAX_CARDS_IN_DECK } from './constants';

const PlayerDetails = () => {
  const {
    players,
    draftPlayer,
    setDraftPlayerName,
    setDraftPlayerColor,
    addPlayerFromDraft,
  } = usePlayerSetupStore(
    useShallow((state) => ({
      players: state.players,
      draftPlayer: state.draftPlayer,
      setDraftPlayerName: state.setDraftPlayerName,
      setDraftPlayerColor: state.setDraftPlayerColor,
      addPlayerFromDraft: state.addPlayerFromDraft,
    })));

  const {
    name: draftPlayerName,
    deck: draftPlayerDeck,
    colorCssValue,
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

  const handleChangeColor = useCallback((colorResult: ColorResult) => {
    setDraftPlayerColor(colorResult.hex);
  }, []);

  return (
    <div>
      <div className="my-5">
        {`Player ${playerIdx + 1} (${playerDirection})`}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="flex-col">
            <Label>Name</Label>
            <Input
              className="max-w-70"
              placeholder="Player name"
              value={draftPlayerName}
              onChange={(e) => setDraftPlayerName(e.target.value)}
            />
          </div>
          <div className="flex-col">
            <Label>Color</Label>
            <CirclePicker color={colorCssValue} onChange={handleChangeColor} />
          </div>
        </div>
        <div className="mr-10">
          <Button className="mr-4" disabled={!isValid} onClick={() => addPlayerFromDraft()}> Done </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
