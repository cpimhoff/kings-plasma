import { ReactNode, useCallback } from 'react';
import { useGameplayStore } from './GameplayStore';
import { Button } from '@/components';
import HandCard from './HandCard';
import { ControllerPlayerContext } from './ControllerPlayerContext';
import { useDebugStore } from '../Debug/DebugStore';
import SelectCardFromLibrary from '../Debug/SelectCardFromLibrary';
import { createCardInstance } from '@/gameplay';

export default function PlayerHand() {
  const { controllerPlayer: currentPlayer } = useContext(ControllerPlayerContext)!;
  const { hand, colorCssValue: color } = currentPlayer;
  const gameState = useGameplayStore((state) => state.gameState);
  const forceSetPlayerHand = useGameplayStore((state) => state.forceSetPlayerHand);
  const { phase } = gameState!;

  const editMode = useDebugStore((state) => state.editMode);

  interface CardWrapperProps {
    idx: number;
    children: ReactNode;
  }
  const CardWrapper = useCallback(
    ({ idx, children }: CardWrapperProps) => {
      if (!editMode) {
        return children;
      }
      return (
        <div className="relative">
          {children}
          <div className="absolute top-0 h-full w-full">
            <div className="mt-3 flex justify-center">
              <Button
                variant="destructive"
                className="text-white"
                onClick={() => {
                  const newHand = [
                    ...currentPlayer.hand.slice(0, idx),
                    ...currentPlayer.hand.slice(idx + 1, currentPlayer.hand.length),
                  ];
                  forceSetPlayerHand(currentPlayer.id, newHand);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      );
    },
    [editMode, currentPlayer],
  );

  return (
    <div>
      <div className="mb-3">{phase === 'setup' ? 'Select up to three cards to mulligan.' : null}</div>
      <div className="flex h-80 w-[70rem] items-center gap-3 overflow-x-auto bg-slate-300 p-2">
        {editMode && (
          <SelectCardFromLibrary
            buttonCopy="Add card"
            onSelectCard={(card) => {
              forceSetPlayerHand(currentPlayer.id, [createCardInstance(card), ...currentPlayer.hand]);
            }}
            color={currentPlayer.colorCssValue}
          ></SelectCardFromLibrary>
        )}
        <>
          {hand.map((card, idx) => (
            <CardWrapper key={card.instanceId} idx={idx}>
              <HandCard idx={idx} card={card} color={color} />
            </CardWrapper>
          ))}
        </>
      </div>
    </div>
  );
}
