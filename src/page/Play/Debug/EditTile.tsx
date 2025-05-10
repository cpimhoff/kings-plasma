import { useState, useCallback } from 'react';
import { BoardPosition, CardDefinition, createCardInstance } from '@/gameplay';
import { useGameplayStore } from '../Game/GameplayStore';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { useDebugStore } from './DebugStore';
import PlayerToggle from './PlayerToggle';
import SelectCardFromLibrary from './SelectCardFromLibrary';

interface Props {
  position: BoardPosition;
}
export default function EditTile({ position }: Props) {
  const [open, setOpen] = useState(false);
  const forceSetBoardTile = useGameplayStore((state) => state.forceSetBoardTile);
  const gameState = useGameplayStore((state) => state.gameState);
  const debugPlayerIdx = useDebugStore((state) => state.selectedPlayerIdx);

  const [fallbackSelectedPlayerIdx, setFallbackSelectedPlayerIdx] = useState(debugPlayerIdx);
  useEffect(() => {
    setFallbackSelectedPlayerIdx(debugPlayerIdx);
  }, [debugPlayerIdx]);

  const tile = useMemo(() => {
    return gameState!.board[position.x][position.y];
  }, [gameState, position]);

  const selectedPlayerIdx: number = useMemo(() => {
    const state = gameState!;
    const players = state.players;
    if (tile.controllerPlayerId) {
      return players.findIndex(p => p.id === tile.controllerPlayerId);
    }
    return fallbackSelectedPlayerIdx;
  }, [gameState, tile, fallbackSelectedPlayerIdx]);

  const selectedPlayer = useMemo(() => {
    return gameState!.players[selectedPlayerIdx];
  }, [gameState, selectedPlayerIdx]);

  const onSelectCard = useCallback(
    (card: CardDefinition) => {
      forceSetBoardTile(position, {
        position,
        card: createCardInstance(card),
        pips: 0,
        controllerPlayerId: selectedPlayer.id,
      });
      setOpen(false);
    },
    [position],
  );

  return (
    <div className="flex h-full w-full items-start justify-center pt-3">
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <PopoverAnchor asChild>
          <Button onClick={() => setOpen(true)}>Edit</Button>
        </PopoverAnchor>
        <PopoverContent className="w-100">
          <div className="flex justify-around">
            <div className="grow">
              <div>Uncontrolled</div>
              <div>
                <Button
                  onClick={() => {
                    forceSetBoardTile(position, {
                      position,
                      card: null,
                      controllerPlayerId: null,
                      pips: 0,
                    });
                    setOpen(false);
                  }}
                >
                  Clear tile
                </Button>
              </div>
            </div>
            <div className="flex grow flex-col">
              <div className="flex flex-col items-center">
                Controlled
                <PlayerToggle
                  idx={selectedPlayerIdx}
                  onChange={(idx) => {
                    if (tile.controllerPlayerId) {
                      forceSetBoardTile(position, {
                        ...tile,
                        controllerPlayerId: gameState!.players[idx].id,
                      });
                    } else {
                      setFallbackSelectedPlayerIdx(idx);
                    }
                  }}
                />
              </div>
              <div className="flex justify-around">
                <div>
                  <div>No card</div>
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3].map((num) => {
                      return (
                        <Button
                          key={num}
                          onClick={() => {
                            forceSetBoardTile(position, {
                              position,
                              card: null,
                              controllerPlayerId: selectedPlayer.id,
                              pips: num,
                            });
                            setOpen(false);
                          }}
                        >
                          {num} pips
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div>Card</div>
                  <SelectCardFromLibrary
                    buttonCopy="Choose card"
                    onSelectCard={onSelectCard}
                    color={selectedPlayer.colorCssValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
