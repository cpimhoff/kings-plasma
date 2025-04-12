import { Link } from 'react-router';

interface Props extends React.ComponentProps<"div"> {}

export const Home = ({ ...rest }: Props) => {
  return (
    <div
      className="grid min-h-screen place-items-center bg-gray-900 text-white"
      {...rest}
    >
      <p className="text-center text-xl">King's Plasma</p>
      <div>
        <Link to="/play">Play</Link>
      </div>
    </div>
  );
};
