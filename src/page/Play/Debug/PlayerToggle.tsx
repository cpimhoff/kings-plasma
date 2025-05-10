import { useGameplayStore } from '../Game/GameplayStore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Props {
  idx: number;
  onChange: (idx: number) => void;
}
export default function PlayerToggle({ idx, onChange }: Props) {
  const players = useGameplayStore((state) => state.gameState!.players);
  return (
    <RadioGroup
      defaultValue="0"
      className="flex"
      value={String(idx)}
      onValueChange={(idx) => {
        onChange(Number(idx));
      }}
    >
      {[0, 1].map((idx) => {
        const value = String(idx);
        const player = players[idx];
        const name = player.name;
        return (
          <div key={idx} className="p-1 border-2" style={{ 'borderColor': player.colorCssValue }}>
            <Label htmlFor={value}>{name}</Label>
            <RadioGroupItem value={value} />
          </div>
        );
      })}
    </RadioGroup>
  );
}
