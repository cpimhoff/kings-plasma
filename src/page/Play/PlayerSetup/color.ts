import { HSLColor } from 'react-color';

export function getRandomHSLColor(): HSLColor {
  return {
    h: Math.random() * 360,
    s: 1,
    l: 1,
  };
}

export function stringifyHSLColor(color: HSLColor): string {
  return `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`;
}
