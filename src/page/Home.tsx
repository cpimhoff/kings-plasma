import { Link } from 'react-router';
import { useGameModeStore } from './Play/GameModeStore';

interface Props extends React.ComponentProps<'div'> {}

export const Home = ({ ...rest }: Props) => {
  const setGameMode = useGameModeStore((state) => state.setGameMode);
  return (
    <div className="grid min-h-screen place-items-center bg-gray-900 text-white" {...rest}>
      <div className="flex flex-col items-center gap-10">
        <div>
          <p className="text-center text-xl">King's Plasma</p>
          <p className="text-center">Explore the Realms.</p>
        </div>
        <div className="flex flex-col items-center">
          Play
          <div className="flex gap-5">
            <Link to="/play" viewTransition onClick={() => setGameMode('local-1p')}>
              1 Player (vs CPU)
            </Link>
            <Link to="/play" viewTransition onClick={() => setGameMode('local-2p')}>
              2 Players (PvP)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
