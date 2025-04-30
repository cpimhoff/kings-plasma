import { CardDefinition, FF7_LIBRARY, withReversedVectors } from '@/gameplay';
import { create } from 'zustand';

type Handedness = 'left' | 'right';
interface CardLibraryStore {
  // public
  cardLibrary: CardDefinition[];
  cardDefByTypeId: Record<CardDefinition['typeId'], CardDefinition>;
  handedness: Handedness;
  flipHandedness: () => void;
  // private
  _byHandedness: {
    left: {
      cardLibrary: CardDefinition[];
      cardDefByTypeId: Record<CardDefinition['typeId'], CardDefinition>;
    };
    right: {
      cardLibrary: CardDefinition[];
      cardDefByTypeId: Record<CardDefinition['typeId'], CardDefinition>;
    };
  };
}

export const useCardLibraryStore = create<CardLibraryStore>((set) => ({
  ...getInitialState(),
  flipHandedness: () =>
    set((state) => {
      const newHandedness = state.handedness === 'left' ? 'right' : 'left';
      return {
        ...state._byHandedness[newHandedness],
        handedness: newHandedness,
      };
    }),
}));

function getInitialState(): Omit<CardLibraryStore, 'flipHandedness'> {
  const leftHandedLibrary = FF7_LIBRARY;
  const leftHandedMapping: Record<CardDefinition['typeId'], CardDefinition> = {},
    rightHandedMapping: Record<CardDefinition['typeId'], CardDefinition> = {};
  leftHandedLibrary.forEach((cardDef) => {
    leftHandedMapping[cardDef.typeId] = cardDef;
    rightHandedMapping[cardDef.typeId] = withReversedVectors(cardDef);
  });
  const rightHandedLibrary = FF7_LIBRARY.map((cardDef) => {
    return rightHandedMapping[cardDef.typeId];
  });
  const _byHandedness = {
    left: {
      cardLibrary: leftHandedLibrary,
      cardDefByTypeId: leftHandedMapping,
    },
    right: {
      cardLibrary: rightHandedLibrary,
      cardDefByTypeId: rightHandedMapping,
    },
  };
  const initialHandedness = 'left';
  return {
    _byHandedness,
    handedness: initialHandedness,
    ..._byHandedness[initialHandedness],
  };
}
