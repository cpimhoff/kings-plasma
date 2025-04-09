import { CardEffect } from "../state";

export type ShorthandVectors = string | Array<{ dx: number; dy: number }>;
export namespace ShorthandVectors {
  export function parse(
    grid: ShorthandVectors,
  ): Array<{ dx: number; dy: number }> {
    if (typeof grid === "object") return grid;
    return [];
  }
}

export function onPlayPips(
  vectors: ShorthandVectors,
  amount: number = 1,
): CardEffect {
  return {
    trigger: { id: "onPlay", targets: { self: true } },
    actions: [
      {
        id: "addControlledPips",
        vectors: ShorthandVectors.parse(vectors),
        amount,
      },
    ],
  };
}
