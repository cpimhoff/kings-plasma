import { memo } from 'react';
import { getGridForCardEffects, CardGridCell, CardDefinition } from '@/gameplay/state/Card';
import { cn } from '@/utils/cn';

interface Props {
  effects: CardDefinition['effects'];
}
const CardEffectPreviewGrid = memo(({ effects }: Props) => {
  const grid = useMemo(() => {
    return getGridForCardEffects(effects);
  }, [effects]);
  return (
    <div className="grid w-full grid-flow-col grid-cols-5 grid-rows-5 border border-2 border-black">
      {grid.map((col, i) => col.map((cell, j) => <div key={`${i},${j}`} className={cn(classesForCell(cell))}></div>))}
    </div>
  );
});

function classesForCell(cell: CardGridCell) {
  return {
    'aspect-square border-2 border-black': true,
    'bg-zinc-500': !cell.origin && !cell.claims,
    'bg-sky-100': cell.origin,
    'bg-yellow-300': cell.claims,
    'outline outline-3 outline-offset-[-5px] outline-red-300': cell.affects,
  };
}

export default CardEffectPreviewGrid;
