import { MAX_CARDS_TO_MULLIGAN } from '@/gameplay/constants';
import { create } from 'zustand';

interface MulliganStore {
  handIndexesToMulligan: number[];

  toggleHandIndexToMulligan: (handIdx: number) => void;
  resetMulligans: () => void;
}

export const useMulliganStore = create<MulliganStore>((set, get) => ({
  handIndexesToMulligan: [],

  toggleHandIndexToMulligan: (handIdx) => {
    const { handIndexesToMulligan } = get();
    let newVal = null;
    if (handIndexesToMulligan.includes(handIdx)) {
      newVal = handIndexesToMulligan.filter((i) => i !== handIdx);
    } else if (handIndexesToMulligan.length < MAX_CARDS_TO_MULLIGAN) {
      newVal = [...handIndexesToMulligan, handIdx];
    }
    if (newVal) {
      set({
        handIndexesToMulligan: newVal,
      });
    }
  },

  resetMulligans: () =>
    set(() => ({
      handIndexesToMulligan: [],
    })),
}));
