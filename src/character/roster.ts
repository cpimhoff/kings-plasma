import { GreedyScore, GreedyTerritory, GreedyMixedHeuristic as GreedyMixedHeuristic, RandomChoice } from '@/agent';
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
  {
    name: 'Point Addict',
    description: 'Greedily maximizes own score',
    deck: [
      { cardTypeId: 'security-officer', count: 3 },
      { cardTypeId: 'j-unit-sweeper', count: 3 },
    ] as Array<DehydratedCardGroup>,
    agent: GreedyScore,
  },
  {
    name: 'Colonialism Incarnate',
    description: 'Greedily maximizes own territory',
    deck: [
      { cardTypeId: 'security-officer', count: 3 },
      { cardTypeId: 'j-unit-sweeper', count: 3 },
    ] as Array<DehydratedCardGroup>,
    agent: GreedyTerritory,
  },
  {
    name: 'Jim',
    description: 'Regular guy',
    deck: [
      { cardTypeId: 'security-officer', count: 2 },
      { cardTypeId: 'j-unit-sweeper', count: 1 },
      { cardTypeId: 'levrikon', count: 2 },
      { cardTypeId: 'grasslands-wolf', count: 2 },
      { cardTypeId: 'crystalline-crab', count: 2 },
      { cardTypeId: 'quetzalcoatl', count: 2 },
      { cardTypeId: 'ogre', count: 2 },
    ] as Array<DehydratedCardGroup>,
    agent: GreedyMixedHeuristic,
  },
  {
    name: 'God',
    description: 'All-knowing grandmaster',
    deck: [
      { cardTypeId: 'security-officer', count: 3 },
      { cardTypeId: 'j-unit-sweeper', count: 3 },
    ] as Array<DehydratedCardGroup>,
    agent: RandomChoice,
  },
];

export default roster;
