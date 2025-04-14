interface Props {
  pips: number;
};
const TilePips = ({ pips }: Props) => {
  return (
    <div>
      pips: {pips}
    </div>
  );
};

export default TilePips;

