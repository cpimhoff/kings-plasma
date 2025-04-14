import { useCallback, useState } from 'react';
import { Vector2 } from '@/utils/vector';
import { Button } from '@/components/ui/button';
import { useGameplayStore } from '@/gameplay/store' ;
import { Card as ICard } from '@/gameplay/state/Card';
import { getPlayerWithId } from '@/gameplay/state/Player';
import FullCard from '../PlayerSetup/FullCard'; // TODO either move this or make a new component

const MAX_CARDS_TO_MULLIGAN = 3;

const PlayerHand = () => {
  const { gameState, dispatchAction } = useGameplayStore();
  const {
    phase,
    players,
    playPhaseActivePlayerId,
  } = gameState!;
  const { id: playerId, hand } = getPlayerWithId(players, playPhaseActivePlayerId);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  // const [targetBoardtile, setTargetBoardTile] = useState<Vector2 | null>(null);
  const onClickCardAtIndex = useCallback<(idx: number) => void>((idx) => {
    if (phase === 'setup') {
      if (selectedCardIndexes.length < MAX_CARDS_TO_MULLIGAN) {
        setSelectedCardIndexes([...selectedCardIndexes, idx]);
      }
    } else {
      setSelectedCardIndexes([idx]);
    }
  }, [phase]);
  const onMulligan = useCallback(() => {
    dispatchAction({
      type: 'mulligan',
      playerId,
      handIndexes: selectedCardIndexes,
    });
  }, [playerId]);
  return (
    <div>
      { phase === 'setup' && (
        <Button
          onClick={() => onMulligan}
        >
          Mulligan
        </Button>
      ) }
      <div>
        { hand.map((card, idx) => (
          <div key={card.id} onClick={() => onClickCardAtIndex(idx)}>
            <FullCard {...card} />
          </div>
        )) }
      </div>
    </div>
  );
};

export default PlayerHand;
