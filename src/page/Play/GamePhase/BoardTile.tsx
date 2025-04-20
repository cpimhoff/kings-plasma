import { cn } from '@/utils/cn';
import { BoardPosition } from '@/gameplay/state/Board';
import { useGameplayStore } from '@/gameplay/store';
import { useInteractionStore, canPlayerPlaceCardAtTile } from './interactionStore';
import { useShallow } from 'zustand/react/shallow';
import { getPlayerWithId } from '@/gameplay/state/Player';
import { positionsEqual } from '@/gameplay/state/Board';

import TileContainer from './TileContainer';
import TileCard from './TileCard';
import TilePips from './TilePips';

interface Props {
  position: BoardPosition;
}
const BoardTile = ({
  position,
}: Props) => {
  const {
    gameState,
    previewState,
    previewAction,
    clearPreview,
  } = useGameplayStore(useShallow((state) => ({
    gameState: state.gameState,
    previewState: state.previewState,
    previewAction: state.previewAction,
    clearPreview: state.clearPreview,
  })));

  const state = gameState!;

  const {
    hoveredBoardPosition,
    selectedHandIndex,
    selectedBoardPosition,
    hoverOverBoardPosition,
    resetHover,
    resetSelections,
    clickBoardPosition,
  } = useInteractionStore(useShallow((state) => ({
    hoveredBoardPosition: state.hoveredBoardPosition,
    selectedHandIndex: state.selectedHandIndex,
    selectedBoardPosition: state.selectedBoardPosition,
    hoverOverBoardPosition: state.hoverOverBoardPosition,
    clickBoardPosition: state.clickBoardPosition,
    resetHover: state.resetHover,
    resetSelections: state.resetSelections,
  })));

  const [ isHovered, isSelected ] = useMemo(() => {
    const isHovered = hoveredBoardPosition && positionsEqual(position, hoveredBoardPosition);
    const isSelected = selectedBoardPosition && positionsEqual(position, selectedBoardPosition);
    return [ isHovered, isSelected ];
  }, [position, hoveredBoardPosition, selectedBoardPosition]);

  const handleHover = useCallback(() => {
    hoverOverBoardPosition(position);
  }, [position]);

  const handleClick = useCallback(() => {
    const didSelect = clickBoardPosition(position, state);
    if (didSelect && selectedHandIndex !== null) {
      const activePlayer = getPlayerWithId(state.players, state.playPhaseActivePlayerId);
      previewAction({
        type: 'playCard',
        playerId: activePlayer.id,
        fromHandIndex: selectedHandIndex,
        toBoardPosition: position,
      });
    } else {
      clearPreview();
      resetSelections();
    }
  }, [position, state, selectedHandIndex]);


  const isValidDestinationForSelectedCard = useMemo(() => {
    if (selectedHandIndex === null) return false;
    const tile = state.board[position.x][position.y];
    const activePlayer = getPlayerWithId(state.players, state.playPhaseActivePlayerId);
    const selectedCard = activePlayer.hand[selectedHandIndex];
    return canPlayerPlaceCardAtTile(activePlayer, selectedCard, tile);
  }, [selectedHandIndex, state]);

  const {
    occupyingCard,
    occupyingPips,
  } = useMemo(() => {
    let cardNode = null, pipsNode = null;
    const currentTile = state.board[position.x][position.y];
    const previewTile = previewState?.board[position.x][position.y];
    const tile = previewTile || currentTile;
    const { controllerPlayerId } = tile;
    if (controllerPlayerId) {
      let highlightPips = false;
      let nerfedPower = false;
      let buffedPower = false;
      if (previewTile) {
        if (currentTile.pips !== previewTile.pips || currentTile.controllerPlayerId !== previewTile.controllerPlayerId) {
          highlightPips = true;
        }
        const { card: currentCard } = currentTile;
        const { card: previewCard } = previewTile;
        if (currentCard && previewCard && currentCard.power !== previewCard.power) {
          if (previewCard.power < currentCard.power) {
            nerfedPower = true;
          } else {
            buffedPower = true;
          }
        }
      }
      const { card, pips } = tile;
      const color = getPlayerWithId(state.players, controllerPlayerId).colorCssValue;
      cardNode = card && <TileCard card={card} color={color} nerfedPower={nerfedPower} buffedPower={buffedPower} /> || null;
      pipsNode = pips > 0 && <TilePips pips={pips} color={color} highlight={highlightPips} /> || null;
    }
    return {
      occupyingCard: cardNode,
      occupyingPips: pipsNode,
    };
  }, [state, previewState]);

  const underlay = useMemo(() => (
    <div className={cn('absolute', 'w-full', 'h-full', 'top-0', 'opacity-60', {
      'bg-sky-100': isHovered && !isSelected,
      'bg-sky-200': isSelected,
      'border border-3 border-green-300': isValidDestinationForSelectedCard,
    })}> </div>
  ), [isHovered, isSelected, isValidDestinationForSelectedCard]);

  return (
    <TileContainer>
      <div
        className="w-full h-full relative"
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => resetHover()}
        onClick={() => handleClick()}
      >
        { occupyingPips }
        { occupyingCard }
        { underlay }
      </div>
    </TileContainer>
  );
};

export default BoardTile;
