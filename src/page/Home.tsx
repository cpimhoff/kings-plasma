import { Link } from 'react-router';

interface Props extends React.ComponentProps<'div'> {}

export const Home = ({ ...rest }: Props) => {
  return (
    <div className="grid min-h-screen place-items-center bg-gray-900 text-white" {...rest}>
      <div>
        <p className="text-center text-xl">King's Plasma</p>
        <p className="text-center">Explore the Realms.</p>
      </div>
      <div>
        <Link to="/play">Play</Link>
      </div>
    </div>
  );
};
