/** stateless implementation of the XOR128 stable randomizer algorithm */
export type StableRandomState = { x: number; y: number; z: number; w: number };
export const StableRandom = {
  init(seed: string = crypto.randomUUID()) {
    const s: StableRandomState = { x: 0, y: 0, z: 0, w: 0 };
    for (let i = 0; i < seed.length + 64; ++i) s.x ^= seed.charCodeAt(i) | 0;
    return s;
  },
  next(state: StableRandomState) {
    const t = state.x ^ (state.x << 11);
    state.x = state.y;
    state.y = state.z;
    state.z = state.w;
    state.w = state.w ^ ((state.w >>> 19) ^ t ^ (t >>> 8));
    return (state.w >>> 0) / 0x1_00_00_00_00;
  },
};
