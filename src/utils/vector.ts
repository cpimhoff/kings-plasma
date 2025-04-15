export type Vector2 = { dx: number; dy: number };

export function addVector2s(v1: Vector2, v2: Vector2): Vector2 {
  return {
    dx: v1.dx + v2.dx,
    dy: v1.dy + v2.dy,
  };
}

export function invertVector2(v: Vector2): Vector2 {
  return {
    dx: -v.dx,
    dy: -v.dy,
  };
};
