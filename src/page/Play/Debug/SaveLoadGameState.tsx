import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components';
import { useDebugStateStorage } from './DebugStateStorage';
import { useGameplayStore } from '../Game/GameplayStore';

interface Props {
  disabled: boolean;
}
export default function SaveLoadGameState({ disabled }: Props) {
  const [open, setOpen] = useState(false);
  const gameState = useGameplayStore((state) => state.gameState);
  const forceSetGameState = useGameplayStore((state) => state.forceSetGameState);
  const { debugStates, saveStateToLocalStorage, deleteStoredState } = useDebugStateStorage();
  const [stateName, setStateName] = useState('');

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <Button disabled={disabled} onClick={() => setOpen(true)}>
        Save/load game state
      </Button>
      <DialogContent>
        <div className="flex mt-3">
          <Button
            disabled={!stateName}
            onClick={() => {
              saveStateToLocalStorage({
                name: stateName,
                state: gameState!,
              });
            }}
          >
            Save current state
          </Button>
          <Input
            className="w-80 ml-1"
            placeholder="Enter a name"
            value={stateName || ''}
            onChange={(e) => setStateName(e.target.value)}
          />
        </div>
        saved states:
        <div>
          {debugStates.map((state) => {
            return (
              <div key={state.name} className="flex">
                <div className="mr-3">{state.name}</div>
                <Button
                  onClick={() => {
                    forceSetGameState(state.state);
                    setOpen(false);
                  }}
                >
                  Load
                </Button>
                <Button
                  onClick={() => {
                    deleteStoredState(state.name);
                  }}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
