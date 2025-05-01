import { Agent } from '@/agent/Agent';
import { DehydratedCardGroup } from '@/deck';

export interface Character {
  name: string;
  description: string;
  deck: DehydratedCardGroup[];
  agent: Agent;
}
