import { useShallow } from 'zustand/react/shallow';
import { CirclePicker, ColorResult } from 'react-color';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAvailableColors } from './color';
import { MIN_CARDS_IN_DECK, MAX_CARDS_IN_DECK } from '@/gameplay/constants';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { Player } from '@/gameplay';

interface Props {
  onSubmit: (p: Player) => void;
}

export default function PlayerDetails({ onSubmit }: Props) {
  const { draftPlayer, setDraftPlayerName, setDraftPlayerColor, getPlayer } = useCreatePlayerStore(
    useShallow((state) => ({
      draftPlayer: state.draftPlayer,
      setDraftPlayerName: state.setDraftPlayerName,
      setDraftPlayerColor: state.setDraftPlayerColor,
      getPlayer: state.getPlayer,
    })),
  );

  const { name: draftPlayerName, deckCardGroups: draftPlayerDeckCounts, colorCssValue } = draftPlayer;
  const deckSize = useMemo(
    () => Object.values(draftPlayerDeckCounts).reduce((s, g) => s + g.count, 0),
    [draftPlayerDeckCounts],
  );

  const isValid = useMemo(() => {
    return deckSize >= MIN_CARDS_IN_DECK && deckSize <= MAX_CARDS_IN_DECK && !!draftPlayerName;
  }, [deckSize, draftPlayerName]);

  const handleChangeColor = useCallback((colorResult: ColorResult) => {
    setDraftPlayerColor(colorResult.hex);
  }, []);

  const handleSubmit = useCallback(() => {
    const player = getPlayer();
    onSubmit(player);
  }, []);

  return (
    <div className="bg-slate-300 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex-col">
            <Label>Name</Label>
            <Input
              className="mt-1 max-w-70 bg-white"
              placeholder="Player name"
              value={draftPlayerName}
              onChange={(e) => setDraftPlayerName(e.target.value)}
            />
          </div>
          <div className="flex-col">
            <Label>Color</Label>
            <div className="mt-1">
              <CirclePicker
                width="450px"
                color={colorCssValue}
                colors={getAvailableColors()}
                onChange={handleChangeColor}
              />
            </div>
          </div>
        </div>
        <Button disabled={!isValid} onClick={() => handleSubmit()}>
          Save
        </Button>
      </div>
    </div>
  );
}
