import { HSLColor } from 'react-color';

const colors = [
  '#c782c1',
  '#cc5ac2',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
];

export function getAvailableColors() {
  return colors;
}

export function getRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getRandomAvailableColor(existingColor?: string) {
  let newColor;
  do {
    newColor = getRandomColor();
  } while (newColor === existingColor);
  return newColor;
}

export function stringifyHSLColor(color: HSLColor): string {
  return `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`;
}
