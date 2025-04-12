import { StableRandom } from "@/utils/random";
import { GameState } from "../state";

/** Stable randomizer functions.
 * Note that, like other process functions, these modify the `state.rng`
 * object in place. */

export function nextStableUniform(
  state: GameState,
  min: number = 0,
  max: number = 1,
): number {
  return StableRandom.next(state.rng) * (max - min) + min;
}

export function nextStableInt(
  state: GameState,
  min: number = 0,
  max: number = 1,
): number {
  return Math.floor(nextStableUniform(state, min, max + 1));
}

export function nextStableBoolean(state: GameState): boolean {
  return nextStableUniform(state, 0, 2) < 1;
}

export function nextStableShuffle<T>(state: GameState, array: T[]): T[] {
  // Fisher-Yates shuffle
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = nextStableInt(state, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
