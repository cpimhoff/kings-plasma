import { create } from 'zustand';

const MAX_CARDS_TO_MULLIGAN = 3;

interface MulliganStore {
  handIndexesToMulligan: number[];

  toggleHandIndexToMulligan: (handIdx: number) => void;
  resetMulligans: () => void;
};

export const useMulliganStore = create<MulliganStore>((set, get) => ({
  handIndexesToMulligan: [],

  toggleHandIndexToMulligan: (handIdx) => {
    const { handIndexesToMulligan } = get();
    if (handIndexesToMulligan.length === MAX_CARDS_TO_MULLIGAN) return;
    let newVal;
    if (handIndexesToMulligan.includes(handIdx)) {
      newVal = handIndexesToMulligan.filter(i => i !== handIdx);
    } else {
      newVal = [...handIndexesToMulligan, handIdx];
    }
    set({
      handIndexesToMulligan: newVal,
    });
  },

  resetMulligans: () => set(() => ({
    handIndexesToMulligan: [],
  })),

}));
