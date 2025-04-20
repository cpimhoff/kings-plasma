import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const TileContainer = ({ children }: Props) => {
  return <div className="border-px h-full w-full border border-black">{children}</div>;
};

export default TileContainer;
