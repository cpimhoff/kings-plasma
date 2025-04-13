export type Vector2 = { dx: number; dy: number };

export const addVector2s: ((v1: Vector2, v2: Vector2) => Vector2) = (v1, v2) => {
  return {
    dx: v1.dx + v2.dx,
    dy: v1.dy + v2.dy,
  };
}
