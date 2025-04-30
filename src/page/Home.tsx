import { Link } from 'react-router';

interface Props extends React.ComponentProps<'div'> {}

export const Home = ({ ...rest }: Props) => {
  return (
    <div className="grid min-h-screen place-items-center bg-gray-900 text-white" {...rest}>
      <div className="flex flex-col items-center gap-10">
        <div>
          <p className="text-center text-xl">King's Plasma</p>
          <p className="text-center">Explore the Realms.</p>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/play" viewTransition>
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};
