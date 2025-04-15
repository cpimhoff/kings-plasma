import { cn } from '@/utils/cn';
import { BoardTile as IBoardTile } from '@/gameplay/state/Board';
import { useGameplayStore } from '@/gameplay/store';
import { getPlayerWithId } from '@/gameplay/state/Player';
import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';

interface Props {
  tile: IBoardTile;
  isSelected: boolean;
  onClick: (tile: IBoardTile) => void;
}
const BoardTile = ({ tile, isSelected, onClick }: Props) => {
  const { card, pips, controllerPlayerId } = tile;
  const gameState = useGameplayStore((state) => state.gameState);
  const { players } = gameState!;
  const player = controllerPlayerId ? getPlayerWithId(players, controllerPlayerId) : null;
  const color = player?.colorCssValue;
  return (
    <TileContainer>
      <div
        className="w-full h-full relative"
        onClick={() => onClick(tile)}
      >
        { color && (
          <>
            { card && (
              <TileCard card={card} color={color} />
            ) }
            { pips > 0 && <TilePips pips={pips} color={color} /> }
          </>
        ) }
        <div className={cn('absolute', 'w-full', 'h-full', 'top-0', 'opacity-60', {
          'bg-sky-100': isSelected,
        })}>
        </div>
      </div>
    </TileContainer>
  );
};

export default BoardTile;
