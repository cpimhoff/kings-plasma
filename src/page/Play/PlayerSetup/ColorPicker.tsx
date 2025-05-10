import { useCallback } from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { getAvailableColors } from './color';

interface Props {
  color: string;
  onSelectColor: (color: string) => void;
}
export default function ColorPicker({ color, onSelectColor }: Props) {
  const handleSelectColor = useCallback((colorResult: ColorResult) => {
    onSelectColor(colorResult.hex);
  }, []);
  return (
    <div className="flex-col">
      <Label>Color</Label>
      <div className="mt-1">
        <CirclePicker width="450px" color={color} colors={getAvailableColors()} onChange={handleSelectColor} />
      </div>
    </div>
  );
}
