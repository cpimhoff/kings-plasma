import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MIN_CARDS_IN_DECK, MAX_CARDS_IN_DECK } from '@/gameplay/constants';
import { useCreatePlayerStore } from './CreatePlayerStore';
import { Player } from '@/gameplay';
import ColorPicker from './ColorPicker';

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

  const handleChangeColor = useCallback((color: string) => {
    setDraftPlayerColor(color);
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
          <ColorPicker color={colorCssValue} onSelectColor={handleChangeColor} />
        </div>
        <Button disabled={!isValid} onClick={() => handleSubmit()}>
          Save
        </Button>
      </div>
    </div>
  );
}
