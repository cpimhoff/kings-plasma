import { RandomChoice } from '../heuristics/RandomChoice';
import { Character } from './Character';
import { DehydratedCardGroup } from '@/deck';

const roster: Character[] = [
  {
    name: 'Rando',
    description: 'Plays random moves',
    deck: [
      { cardTypeId: 'security-officer', count: 3 },
      { cardTypeId: 'j-unit-sweeper', count: 3 },
    ] as Array<DehydratedCardGroup>,
    agent: RandomChoice,
  },
];

export default roster;
