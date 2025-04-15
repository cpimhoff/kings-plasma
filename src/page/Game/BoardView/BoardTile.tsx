import { cn } from '@/utils/cn';
import { BoardTile as IBoardTile } from '@/gameplay/state/Board';
import { useGameplayStore } from '@/gameplay/store';
import { useInteractionStore, canPlayerPlaceCardAtTile } from './interactionStore';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import { positionsEqual } from '@/gameplay/state/Board';

import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';

interface Props {
  tile: IBoardTile;
}
const BoardTile = ({
  tile,
}: Props) => {
  const { card, pips, position, controllerPlayerId } = tile;

  const { gameState, previewAction } = useGameplayStore(useShallow((state) => ({
    gameState: state.gameState,
    previewAction: state.previewAction,
  })));

  const state = gameState!;

  const {
    hoveredBoardPosition,
    selectedHandIndex,
    selectedBoardPosition,
    hoverOverBoardPosition,
    resetHover,
    clickBoardPosition,
  } = useInteractionStore(useShallow((state) => ({
    hoveredBoardPosition: state.hoveredBoardPosition,
    selectedHandIndex: state.selectedHandIndex,
    selectedBoardPosition: state.selectedBoardPosition,
    hoverOverBoardPosition: state.hoverOverBoardPosition,
    resetHover: state.resetHover,
    clickBoardPosition: state.clickBoardPosition,
  })));

  const isHovered = useMemo(() => (
    hoveredBoardPosition && positionsEqual(position, hoveredBoardPosition)
  ), [position, hoveredBoardPosition]);

  const isSelected = useMemo(() => (
    selectedBoardPosition && positionsEqual(position, selectedBoardPosition)
  ), [position, selectedBoardPosition]);

  const player = controllerPlayerId ? getPlayerWithId(state.players, controllerPlayerId) : null;
  const color = player?.colorCssValue;

  const canPlaceSelectedCardHere = useMemo(() => {
    if (selectedHandIndex === null) return false;
    const activePlayer = getPlayerWithId(state.players, state.playPhaseActivePlayerId);
    const selectedCard = activePlayer.hand[selectedHandIndex];
    return canPlayerPlaceCardAtTile(activePlayer, selectedCard, tile);
  }, [selectedHandIndex, gameState]);

  const handleHover = useCallback(() => {
    hoverOverBoardPosition(tile.position);
    if (selectedHandIndex !== null) {
      const activePlayer = getPlayerWithId(state.players, state.playPhaseActivePlayerId);
      previewAction({
        type: 'playCard',
        playerId: activePlayer.id,
        fromHandIndex: selectedHandIndex,
        toBoardPosition: tile.position,
      });
    }
  }, []);

  return (
    <TileContainer>
      <div
        className="w-full h-full relative"
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => resetHover()}
        onClick={() => clickBoardPosition(tile.position, state)}
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
          'bg-sky-100': isHovered && !isSelected,
          'bg-sky-200': isSelected,
          'border border-3 border-green-300': canPlaceSelectedCardHere,
        })}>
        </div>
      </div>
    </TileContainer>
  );
};

export default BoardTile;
