import { useGameplayStore } from '@/gameplay/store' ;
import { useSelectionStore } from './selectionStore';
import { useShallow } from 'zustand/react/shallow';
import { Player } from '@/gameplay/state/Player';
import HandCard from './HandCard';

interface Props {
  player: Player,
}
const PlayerHand = ({ player }: Props) => {
  const { gameState } = useGameplayStore();
  const { phase } = gameState!;

  const { hand } = player;

  const {
    selectedHandIndexes,
    clickHandIndex,
  } = useSelectionStore(useShallow((state) => ({
    selectedHandIndexes: state.selectedHandIndexes,
    clickHandIndex: state.clickHandIndex,
  })));

  return (
    <div className="flex">
      { hand.map((card, idx) => (
        <div
          key={`${player.id},${card.id},${idx}`}
          className="w-xs"
          onClick={() => clickHandIndex(idx, phase)}
        >
          <HandCard card={card} isSelected={selectedHandIndexes.includes(idx)} />
        </div>
      )) }
    </div>
  );
};

export default PlayerHand;
