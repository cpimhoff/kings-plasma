import { cn } from '@/utils/cn';
interface Props {
  pips: number;
  color: string;
  highlight: boolean;
}
const TilePips = ({ pips, color, highlight }: Props) => {
  if (pips === 0) return;
  const pipNode = <Pip color={color} highlight={highlight} />;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      {pips === 3 && pipNode}
      <div className="flex">
        {pipNode} {pips > 1 && pipNode}
      </div>
    </div>
  );
};

type PipProps = Pick<Props, 'color' | 'highlight'>;
const Pip = ({ color, highlight }: PipProps) => (
  <div
    className={cn('m-1 h-5 w-5 rounded-full')}
    style={{
      backgroundColor: color,
      boxShadow: highlight ? `0 0 10px 2px ${color}` : undefined,
    }}
  ></div>
);

export default TilePips;
