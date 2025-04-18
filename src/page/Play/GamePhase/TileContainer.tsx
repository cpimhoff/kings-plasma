import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const TileContainer = ({ children }: Props) => {
  return (
    <div className="w-full h-full border border-px border-black">
      { children }
    </div>
  );
};

export default TileContainer;
