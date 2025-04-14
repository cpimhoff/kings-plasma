import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const TileContainer = ({ children }: Props) => {
  return (
    <div className="w-20 h-40 border border-black">
      { children }
    </div>
  );
};

export default TileContainer;
