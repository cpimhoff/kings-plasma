import { cn } from '@/utils/cn';
import { BoardPosition } from '@/gameplay/state/Board';
import { useGameplayStore } from './GameplayStore';
import { useInteractionStore } from './InteractionStore';
import { canPlayerPlaceCardAtTile } from '@/gameplay/validation';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import { positionsEqual } from '@/gameplay/state/Board';
import FullCard from '@/components/Card/FullCard';

import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';
import { useDebugStore } from '../Debug/DebugStore';
import EditTile from '../Debug/EditTile';
import { CardInstance } from '@/gameplay';

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
    const currentColor = currentTile.controllerPlayerId
      ? getPlayerWithId(state.players, currentTile.controllerPlayerId).colorCssValue
      : null;
    const previewTile = previewState?.board[position.x][position.y];
    if (previewTile) {
      const previewColor = previewTile.controllerPlayerId
        ? getPlayerWithId(state.players, previewTile.controllerPlayerId).colorCssValue
        : null;
      if (currentTile.controllerPlayerId && currentTile.card && !previewTile.card) {
        // if the card was destroyed, render it with 0 power, and with any pips on top
        const destroyedCard: CardInstance = {
          ...currentTile.card,
          powerModifier: -1 * currentTile.card.basePower,
        };
        cardNode = <TileCard card={destroyedCard} color={currentColor!} />;
        if (previewTile.controllerPlayerId && previewTile.pips > 0) {
          pipsNode = <TilePips pips={previewTile.pips} color={previewColor!} highlight />;
        }
      } else {
        // just render the preview card instead of the current card
        cardNode = previewTile.card && <TileCard card={previewTile.card} color={previewColor!} />;
        const highlightPips =
          previewTile.pips !== currentTile.pips || previewTile.controllerPlayerId !== currentTile.controllerPlayerId;
        pipsNode = previewTile.pips > 0 && (
          <TilePips pips={previewTile.pips} color={previewColor!} highlight={highlightPips} />
        );
      }
    } else {
      const { controllerPlayerId } = currentTile;
      if (controllerPlayerId) {
        let highlightPips = false;
        const { card, pips } = currentTile;
        cardNode = (card && <TileCard card={card} color={currentColor!} />) || null;
        pipsNode = (pips > 0 && <TilePips pips={pips} color={currentColor!} highlight={highlightPips} />) || null;
      }
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
      return canPlayerPlaceCardAtTile(activePlayer, activeCard, tile) ? 'ValidDestination' : null;
    }
  }, [activeCardHandIndex, isHovered, activePlayer, state]);

  const editMode = useDebugStore((state) => state.editMode);

  const previewCard = useMemo(() => {
    if (editMode) return null;
    if (activeCardHandIndex === null && highlightState === 'Hovered') {
      const tile = state.board[position.x][position.y];
      if (tile.card && tile.controllerPlayerId) {
        const color = getPlayerWithId(state.players, tile.controllerPlayerId).colorCssValue;
        return (
          <Popover>
            <FullCard card={tile.card} color={color} className="relative z-1 w-50" />
          </Popover>
        );
      }
    }
    return null;
  }, [editMode, highlightState]);

  const overlay = useMemo(() => {
    return (
      <div
        className={cn('h-full w-full', {
          'opacity-60': !editMode,
          'bg-sky-100': !editMode && highlightState === 'Hovered',
          'border border-5 border-yellow-400': !editMode && highlightState === 'ValidDestination',
        })}
      >
        {editMode ? <EditTile position={position} /> : null}
      </div>
    );
  }, [highlightState, editMode]);

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
        <div className="relative h-full w-full">
          {occupyingCard && <div className="absolute z-10 h-full w-full">{occupyingCard}</div>}
          {occupyingPips && <div className="absolute z-20 h-full w-full">{occupyingPips}</div>}
          <div className="absolute z-30 h-full w-full">{overlay}</div>
        </div>
        <div className="relative z-40"> {previewCard} </div>
      </div>
    </TileContainer>
  );
};

export default BoardTile;
