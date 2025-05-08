import { cn } from '@/utils/cn';
import { BoardPosition } from '@/gameplay/state/Board';
import { useGameplayStore } from './GameplayStore';
import { useInteractionStore } from './InteractionStore';
import { canPlayerPlaceCardAtTile } from '@/gameplay/validation';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import { positionsEqual } from '@/gameplay/state/Board';
import { Popover } from '@/components/ui/popover';
import FullCard from '@/components/Card/FullCard';

import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';

type HighlightState = 'Hovered' | 'ValidDestination' | null;

interface Props {
  position: BoardPosition;
}
const BoardTile = ({ position }: Props) => {
  const { gameState, previewState, previewAction, dispatchAction, clearPreview } = useGameplayStore(
    useShallow((state) => ({
      gameState: state.gameState,
      previewState: state.previewState,
      previewAction: state.previewAction,
      dispatchAction: state.dispatchAction,
      clearPreview: state.clearPreview,
    })),
  );

  const state = gameState!;

  const {
    hoveredBoardPosition,
    hoveredHandIndex,
    selectedHandIndex,
    hoverOverBoardPosition,
    resetHover,
    resetSelections,
  } = useInteractionStore(
    useShallow((state) => ({
      hoveredBoardPosition: state.hoveredBoardPosition,
      selectedHandIndex: state.selectedHandIndex,
      hoveredHandIndex: state.hoveredHandIndex,
      hoverOverBoardPosition: state.hoverOverBoardPosition,
      resetHover: state.resetHover,
      resetSelections: state.resetSelections,
    })),
  );

  const isHovered = useMemo(() => {
    return hoveredBoardPosition && positionsEqual(position, hoveredBoardPosition);
  }, [position, hoveredBoardPosition]);

  const activeCardHandIndex = selectedHandIndex ?? hoveredHandIndex ?? null;

  const activePlayer = useMemo(() => {
    return getPlayerWithId(state.players, state.playPhaseActivePlayerId);
  }, [state.players, state.playPhaseActivePlayerId]);

  const { occupyingCard, occupyingPips } = useMemo(() => {
    let cardNode = null,
      pipsNode = null;
    const currentTile = state.board[position.x][position.y];
    const previewTile = previewState?.board[position.x][position.y];
    const tile = previewTile || currentTile;
    const { controllerPlayerId } = tile;
    if (controllerPlayerId) {
      let highlightPips = false;
      const { card, pips } = tile;
      const color = getPlayerWithId(state.players, controllerPlayerId).colorCssValue;
      cardNode =
        (card && <TileCard card={card} color={color} />) || null;
      pipsNode = (pips > 0 && <TilePips pips={pips} color={color} highlight={highlightPips} />) || null;
    }
    return {
      occupyingCard: cardNode,
      occupyingPips: pipsNode,
    };
  }, [state, previewState]);

  const highlightState: HighlightState = useMemo(() => {
    if (gameState!.phase !== 'play') return null;
    if (activeCardHandIndex === null) {
      if (isHovered) {
        return 'Hovered';
      }
      return null;
    } else {
      const tile = state.board[position.x][position.y];
      const activeCard = activePlayer.hand[activeCardHandIndex];
      return canPlayerPlaceCardAtTile(activePlayer, activeCard.def, tile) ? 'ValidDestination' : null;
    }
  }, [activeCardHandIndex, isHovered, activePlayer, state]);

  const previewCard = useMemo(() => {
    if (activeCardHandIndex === null && highlightState === 'Hovered') {
      const tile = state.board[position.x][position.y];
      if (tile.card && tile.controllerPlayerId) {
        const color = getPlayerWithId(state.players, tile.controllerPlayerId).colorCssValue;
        return (
          <Popover>
            <FullCard card={tile.card.def} color={color} className="relative z-1 w-50" />
          </Popover>
        );
      }
    }
    return null;
  }, [highlightState]);

  const overlay = useMemo(
    () => (
      <div
        className={cn('absolute', 'w-full', 'h-full', 'top-0', 'opacity-60', {
          'bg-sky-100': highlightState === 'Hovered',
          'border border-5 border-yellow-400': highlightState === 'ValidDestination',
        })}
      >
        {' '}
      </div>
    ),
    [highlightState],
  );

  const handleHoverIn = useCallback(() => {
    hoverOverBoardPosition(position);
    if (selectedHandIndex !== null && highlightState === 'ValidDestination') {
      previewAction({
        type: 'playCard',
        playerId: activePlayer.id,
        fromHandIndex: selectedHandIndex,
        toBoardPosition: position,
      });
    }
  }, [position, selectedHandIndex, highlightState]);

  const handleHoverOut = useCallback(() => {
    resetHover();
    clearPreview();
  }, []);

  const handleClick = useCallback(() => {
    if (selectedHandIndex !== null && highlightState === 'ValidDestination') {
      dispatchAction({
        type: 'playCard',
        playerId: activePlayer.id,
        fromHandIndex: selectedHandIndex!,
        toBoardPosition: {
          x: position.x,
          y: position.y,
        },
      });
      resetHover();
    }
    resetSelections();
  }, [selectedHandIndex, highlightState, activePlayer]);

  return (
    <TileContainer>
      <div
        className="relative h-full w-full"
        onMouseEnter={() => handleHoverIn()}
        onMouseLeave={() => handleHoverOut()}
        onClick={() => handleClick()}
      >
        {occupyingPips}
        {occupyingCard}
        {previewCard}
        {overlay}
      </div>
    </TileContainer>
  );
};

export default BoardTile;
