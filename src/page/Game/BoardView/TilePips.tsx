interface Props {
  pips: number;
  color: string;
};
const TilePips = ({ pips, color }: Props) => {
  if (pips === 0) return;
  const pipNode = <Pip color={color} />;
  return (
    <div className="flex flex-col justify-center items-center h-full">
      { pips === 3 && pipNode }
      <div className="flex">
        { pipNode } { pips > 1 && pipNode }
      </div>
    </div>
  );
};

const Pip = ({ color }: { color: string }) => (
  <div className="w-5 h-5 rounded-full m-1" style={{backgroundColor: color}}>
  </div>
);

export default TilePips;
