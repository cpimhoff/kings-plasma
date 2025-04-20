import { cn } from '@/utils/cn';
interface Props {
  pips: number;
  color: string;
  highlight: boolean;
};
const TilePips = ({ pips, color, highlight }: Props) => {
  if (pips === 0) return;
  const pipNode = <Pip color={color} highlight={highlight}/>;
  return (
    <div className="flex flex-col justify-center items-center h-full">
      { pips === 3 && pipNode }
      <div className="flex">
        { pipNode } { pips > 1 && pipNode }
      </div>
    </div>
  );
};


type PipProps = Pick<Props, 'color' | 'highlight'>;
const Pip = ({ color, highlight }: PipProps) => (
  <div className={cn("w-5 h-5 rounded-full m-1")} style={{
    backgroundColor: color,
    boxShadow: highlight ? `0 0 10px 2px ${color}` : undefined,
  }}>
  </div>
);

export default TilePips;
