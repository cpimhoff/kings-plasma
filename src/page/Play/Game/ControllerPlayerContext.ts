import { Player } from '@/gameplay';
import { createContext } from 'react';

interface IControllerPlayerContext {
  controllerPlayer: Player; // this is the player of the human controlling the page
  controlsLocked: boolean;
}
export const ControllerPlayerContext = createContext<IControllerPlayerContext | null>(null);
