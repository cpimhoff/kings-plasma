import { CardDefinition, CardEffect } from '../state';

export namespace FF7Library {
  // An index of all cards in FF7: Rebirth is available at:
  // https://game8.co/games/Final-Fantasy-VII-Rebirth/archives/Queens-Blood
  // The below definitions are ordered according to how they appear at that link

  export const SecurityOfficer: CardDefinition = {
    typeId: 'security-officer' as CardDefinition['typeId'],
    name: 'Security Officer',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
    ],
  };

  export const RiotTrooper: CardDefinition = {
    typeId: 'riot-trooper' as CardDefinition['typeId'],
    name: 'Riot Trooper',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
    ],
  };

  export const Grenadier: CardDefinition = {
    typeId: 'grenadier' as CardDefinition['typeId'],
    name: 'Grenadier',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [{ dx: 2, dy: 0 }],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 4.`,
  };

  export const JUnitSweeper: CardDefinition = {
    typeId: 'j-unit-sweeper' as CardDefinition['typeId'],
    name: 'J-Unit Sweeper',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
    ],
  };

  export const QueenBee: CardDefinition = {
    typeId: 'queen-bee' as CardDefinition['typeId'],
    name: 'Queen Bee',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]),
    ],
  };

  export const Toxirat: CardDefinition = {
    typeId: 'toxirat' as CardDefinition['typeId'],
    name: 'Toxirat',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [{ dx: 1, dy: -1 }],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 3.`,
  };

  export const Levrikon: CardDefinition = {
    typeId: 'levrikon' as CardDefinition['typeId'],
    name: 'Levrikon',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
  };

  export const GrasslandsWolf: CardDefinition = {
    typeId: 'grasslands-wolf' as CardDefinition['typeId'],
    name: 'Grasslands Wolf',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
    ],
  };

  export const Mu: CardDefinition = {
    typeId: 'mu' as CardDefinition['typeId'],
    name: 'Mu',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+1, {
        limitTo: {
          tiles: [{ dx: 0, dy: -1 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 1 while this card is in play.`,
  };

  export const Mandragora: CardDefinition = {
    typeId: 'mandragora' as CardDefinition['typeId'],
    name: 'Mandragora',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'mandragora-minion' as CardDefinition['typeId'],
          name: 'Mandragora Minion',
          playRequirement: 1,
          basePower: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
            ]),
          ],
        }),
      ),
    ],
    description: `When played, add Mandragora Minion to your hand.`,
  };

  export const Elphadunk: CardDefinition = {
    typeId: 'elphadunk' as CardDefinition['typeId'],
    name: 'Elphadunk',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
  };

  export const Cactuar: CardDefinition = {
    typeId: 'cactuar' as CardDefinition['typeId'],
    name: 'Cactuar',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [{ dx: 1, dy: -2 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
  };

  export const CrystallineCrab: CardDefinition = {
    typeId: 'crystalline-crab' as CardDefinition['typeId'],
    name: 'Crystalline Crab',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [{ dx: 0, dy: 1 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
  };

  export const Quetzalcoatl: CardDefinition = {
    typeId: 'quetzalcoatl' as CardDefinition['typeId'],
    name: 'Quetzalcoatl',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
    ],
  };

  export const Zu: CardDefinition = {
    typeId: 'zu' as CardDefinition['typeId'],
    name: 'Zu',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
    ],
  };

  export const DevilRider: CardDefinition = {
    typeId: 'devil-rider' as CardDefinition['typeId'],
    name: 'Devil Rider',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: -2, dy: 0 },
        { dx: -2, dy: -1 },
        { dx: -2, dy: 1 },
      ]),
    ],
  };

  export const Screamer: CardDefinition = {
    typeId: 'screamer' as CardDefinition['typeId'],
    name: 'Screamer',
    playRequirement: 3,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
    ],
  };

  export const Flan: CardDefinition = {
    typeId: 'flan' as CardDefinition['typeId'],
    name: 'Flan',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ]),
    ],
  };

  export const Crawler: CardDefinition = {
    typeId: 'crawler' as CardDefinition['typeId'],
    name: 'Crawler',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: -1, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
    ],
  };

  export const Archdragon: CardDefinition = {
    typeId: 'archdragon' as CardDefinition['typeId'],
    name: 'Archdragon',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [{ dx: 1, dy: 0 }],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 3.`,
  };

  export const Ogre: CardDefinition = {
    typeId: 'ogre' as CardDefinition['typeId'],
    name: 'Ogre',
    playRequirement: 2,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: -2 },
      ]),
    ],
  };

  export const Deathwheel: CardDefinition = {
    typeId: 'deathwheel' as CardDefinition['typeId'],
    name: 'Deathwheel',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [
              { dx: 2, dy: 2 },
              { dx: 2, dy: -2 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 3.`,
  };

  export const Fleetwing: CardDefinition = {
    typeId: 'fleetwing' as CardDefinition['typeId'],
    name: 'Fleetwing',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -2, dy: 2 },
        { dx: -1, dy: -1 },
        { dx: -2, dy: -2 },
      ]),
    ],
  };

  export const Zemzelett: CardDefinition = {
    typeId: 'zemzelett' as CardDefinition['typeId'],
    name: 'Zemzelett',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [{ dx: -1, dy: 0 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
  };

  export const Ignilisk: CardDefinition = {
    typeId: 'ignilisk' as CardDefinition['typeId'],
    name: 'Ignilisk',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -2 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: 1, dy: 0 },
            { dx: 0, dy: -2 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
  };

  export const Capparwire: CardDefinition = {
    typeId: 'capparwire' as CardDefinition['typeId'],
    name: 'Capparwire',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
  };

  export const MindFlayer: CardDefinition = {
    typeId: 'mind-flayer' as CardDefinition['typeId'],
    name: 'Mind Flayer',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(-1, {
        limitTo: {
          tiles: [
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: -1 },
          ],
        },
      }),
    ],
    description: `Lower the power of allied and enemy cards on affected tiles by 1 while this card is in play.`,
  };

  export const Scrutineye: CardDefinition = {
    typeId: 'scrutineye' as CardDefinition['typeId'],
    name: 'Scrutineye',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+1, {
        limitTo: {
          tiles: [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ],
        },
      }),
    ],
    description: `Raise the power of allied and enemy cards on affected tiles by 1 while this card is in play.`,
  };

  export const HellRiderII: CardDefinition = {
    typeId: 'hell-rider-ii' as CardDefinition['typeId'],
    name: 'Hell Rider II',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: -1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
            ],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 3.`,
  };

  export const Flametrooper: CardDefinition = {
    typeId: 'flametrooper' as CardDefinition['typeId'],
    name: 'Flametrooper',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: -1, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 3.`,
  };

  export const Spearhawk: CardDefinition = {
    typeId: 'spearhawk' as CardDefinition['typeId'],
    name: 'Spearhawk',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [{ dx: 0, dy: -1 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
  };

  export const SeaDevil: CardDefinition = {
    typeId: 'sea-devil' as CardDefinition['typeId'],
    name: 'Sea Devil',
    playRequirement: 3,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: { id: 'onPlay', allegiance: 'allied' },
        actions: [
          {
            id: 'addPower',
            amount: +1,
            limitTo: {
              self: true,
            },
          },
        ],
      },
    ],
    description: `When allied cards are played from hand, raise this card's power by 1.`,
  };

  export const Shoalopod: CardDefinition = {
    typeId: 'shoalopod' as CardDefinition['typeId'],
    name: 'Shoalopod',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+4, {
        limitTo: {
          tiles: [{ dx: 0, dy: 1 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 4 while this card is in play.`,
  };

  export const CrownLance: CardDefinition = {
    typeId: 'crown-lance' as CardDefinition['typeId'],
    name: 'Crown Lance',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
        { dx: 1, dy: -2 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-2, {
          limitTo: {
            tiles: [
              { dx: 1, dy: -1 },
              { dx: 1, dy: -2 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 2.`,
  };

  export const TonberryKing: CardDefinition = {
    typeId: 'tonberry-king' as CardDefinition['typeId'],
    name: 'Tonberry King',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      {
        trigger: { id: 'onDestroy', allegiance: 'allied' },
        actions: [{ id: 'addPower', limitTo: { self: true }, amount: +2 }],
      },
    ],
    description: `When allied cards are destroyed, raise this card's power by 2.`,
  };

  export const SandhogPie: CardDefinition = {
    typeId: 'sandhog-pie' as CardDefinition['typeId'],
    name: 'Sandhog Pie',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(+3, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
            ],
          },
          allegiance: 'allied',
        }),
      ),
    ],
    description: `When destroyed, raise the power of allied cards on affected tile by 3.`,
  };

  export const Bloatfloat: CardDefinition = {
    typeId: 'bloatfloat' as CardDefinition['typeId'],
    name: 'Bloatfloat',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [{ dx: 2, dy: 0 }],
          },
        }),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 4.`,
  };

  export const Bagnadrana: CardDefinition = {
    typeId: 'bagnadrana' as CardDefinition['typeId'],
    name: 'Bagnadrana',
    playRequirement: 3,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: { id: 'onPlay', allegiance: 'opponent' }, // TODO: what about enemy cards played by enemy cards?
        actions: [{ id: 'addPower', limitTo: { self: true }, amount: +1 }],
      },
    ],
    description: `When enemy cards are played from hand, raise this card's power by 1.`,
  };

  export const Cockatrice: CardDefinition = {
    typeId: 'cockatrice' as CardDefinition['typeId'],
    name: 'Cockatrice',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      CardEffect.onThisPlayed({
        id: 'immediatelyDestroy',
        limitTo: {
          tiles: [{ dx: 1, dy: 0 }],
        },
      }),
    ],
    description: `When played, destroy allied and enemy cards on affected tiles.`,
  };

  export const Heatseeker: CardDefinition = {
    typeId: 'heatseeker' as CardDefinition['typeId'],
    name: 'Heatseeker',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.createCardForPlayer({
          // FIXME: need to check the exact card in game, can't find a screenshot
          // of the minion card online...
          typeId: 'heatseeker-minion' as CardDefinition['typeId'],
          name: 'Heatseeker Minion',
          playRequirement: 1,
          basePower: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
            ]),
          ],
        }),
      ),
    ],
    description: `When destroyed, add Heatseeker Minion to your hand.`,
  };

  export const Bomb: CardDefinition = {
    typeId: 'bomb' as CardDefinition['typeId'],
    name: 'Bomb',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: 0, dy: 1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
              { dx: 0, dy: -1 },
              { dx: -1, dy: -1 },
              { dx: -1, dy: 0 },
            ],
          },
        }),
      ),
    ],
    description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 4.`,
  };

  export const Thug: CardDefinition = {
    typeId: 'thug' as CardDefinition['typeId'],
    name: 'Thug',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: 1, dy: 0 },
      ]),
    ],
    description: `When enemy cards are destroyed, raise this card's power by 1.`,
  };

  export const DeathClaw: CardDefinition = {
    typeId: 'death-claw' as CardDefinition['typeId'],
    name: 'Death Claw',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: { id: 'onDestroy', allegiance: 'opponent' },
        actions: [{ id: 'addPower', limitTo: { self: true }, amount: +1 }],
      },
    ],
    description: `When enemy cards are destroyed, raise this card's power by 1.`,
  };

  export const Landworm: CardDefinition = {
    typeId: 'landworm' as CardDefinition['typeId'],
    name: 'Landworm',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: { id: 'onDestroy', allegiance: 'opponent' },
        actions: [{ id: 'addPower', limitTo: { self: true }, amount: +2 }],
      },
    ],
    description: `When enemy cards are destroyed, raise this card's power by 2.`,
  };

  export const Sandspitter: CardDefinition = {
    typeId: 'sandspitter' as CardDefinition['typeId'],
    name: 'Sandspitter',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: -2 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 2 },
              { dx: 1, dy: 2 },
              { dx: 0, dy: -2 },
              { dx: 1, dy: -2 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
  };

  export const Chimera: CardDefinition = {
    typeId: 'chimera' as CardDefinition['typeId'],
    name: 'Chimera',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(2, {
        allegiance: 'opponent',
        powerStatus: {
          enfeebled: true,
        },
      }),
    ],
    description: `Raise power by 2 for each enfeebled enemy card.`,
  };

  export const Joker: CardDefinition = {
    typeId: 'joker' as CardDefinition['typeId'],
    name: 'Joker',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: -2 },
      ]),
      {
        trigger: { id: 'onDestroy' },
        actions: [
          {
            id: 'addPower',
            limitTo: {
              self: true,
            },
            amount: +1,
          },
        ],
      },
    ],
    description: `When allied and enemy cards are destroyed, raise this card's power by 1.`,
  };

  export const Amphidex: CardDefinition = {
    typeId: 'amphidex' as CardDefinition['typeId'],
    name: 'Amphidex',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          {
            id: 'addPower',
            limitTo: {
              tiles: [
                { dx: 0, dy: 1 },
                { dx: 0, dy: 2 },
              ],
            },
            allegiance: 'allied',
            amount: 3,
          },
        ],
        maxActivations: 1,
      },
    ],
    description: `The first time this card is enhanced, raise the power of allied cards on affected tiles by 3.`,
  };

  export const Frightflower: CardDefinition = {
    typeId: 'frightflower' as CardDefinition['typeId'],
    name: 'Frightflower',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(+2, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 2 },
              { dx: 2, dy: 2 },
              { dx: 2, dy: 0 },
              { dx: 2, dy: -2 },
              { dx: 0, dy: -2 },
              { dx: -2, dy: -2 },
              { dx: -2, dy: 0 },
              { dx: -2, dy: 2 },
            ],
          },
        }),
      ),
    ],
    description: `When destroyed, raise the power of allied and enemy cards on affected tiles by 2.`,
  };

  export const Gagighandi: CardDefinition = {
    typeId: 'gigaghandi' as CardDefinition['typeId'],
    name: 'Gagighandi',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          changeDirection: 'increasing',
          limitTo: {
            self: true,
          },
        },
        actions: [
          {
            id: 'addPower',
            amount: -2,
            limitTo: {
              tiles: [
                { dx: 1, dy: -1 },
                { dx: 1, dy: -2 },
              ],
            },
          },
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enhanced, lower the power of enemy cards on affected tiles by 2.`,
  };

  export const InsectoidChimera: CardDefinition = {
    typeId: 'insectoid-chimera' as CardDefinition['typeId'],
    name: 'Insectoid Chimera',
    playRequirement: 'replace',
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
    ],
    description: `Destroy an allied card and replace it.`,
  };

  export const Gigantoad: CardDefinition = {
    typeId: 'gigantoad' as CardDefinition['typeId'],
    name: 'Gigantoad',
    playRequirement: 'replace',
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
    ],
    description: `Destroy an allied card and replace it.`,
  };

  export const Maloceros: CardDefinition = {
    typeId: 'maloceros' as CardDefinition['typeId'],
    name: 'Maloceros',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 2 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -2 },
        { dx: -1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onGameEnd',
          wonRow: true,
        },
        actions: [
          {
            id: 'addScoreBonusForPlayer',
            player: 'controller',
            amount: 10,
          },
        ],
      },
    ],
    description: `When you win the lane, receive a score bonus of 10.`,
  };

  export const Grandhorn: CardDefinition = {
    typeId: 'grandhorn' as CardDefinition['typeId'],
    name: 'Grandhorn',
    playRequirement: 'replace',
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
    description: `Destroy an allied card and replace it.`,
  };

  export const GreatMalboro: CardDefinition = {
    typeId: 'great-malboro' as CardDefinition['typeId'],
    name: 'Great Malboro',
    playRequirement: 3,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-6, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 6.`,
  };

  export const Grangalan: CardDefinition = {
    typeId: 'grangalan' as CardDefinition['typeId'],
    name: 'Grangalan',
    playRequirement: 3,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'grangalan-junior' as CardDefinition['typeId'],
          name: 'Grangalan Junior',
          playRequirement: 2,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: -1, dy: 1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: -1 },
              { dx: -1, dy: -1 },
            ]),
            CardEffect.onThisPlayed(
              CardEffect.createCardForPlayer({
                typeId: 'baby-grangalan' as CardDefinition['typeId'],
                name: 'Baby Grangalan',
                playRequirement: 1,
                basePower: 1,
                effects: [
                  CardEffect.onThisPlayedAddPips([
                    { dx: -1, dy: 1 },
                    { dx: 0, dy: 1 },
                    { dx: 1, dy: 1 },
                    { dx: 1, dy: 0 },
                    { dx: 1, dy: -1 },
                    { dx: 0, dy: -1 },
                    { dx: -1, dy: -1 },
                  ]),
                  CardEffect.onThisDestroyed(
                    CardEffect.addPower(5, {
                      limitTo: {
                        tiles: [
                          { dx: -1, dy: 1 },
                          { dx: 0, dy: 1 },
                          { dx: 1, dy: 1 },
                          { dx: 1, dy: 0 },
                          { dx: 1, dy: -1 },
                          { dx: 0, dy: -1 },
                          { dx: -1, dy: -1 },
                        ],
                      },
                    }),
                  ),
                ],
                description: `When destroyed, lower the power of allied and enemy cards on affected tiles by 5.`,
              }),
            ),
          ],
          description: `When played, add Baby Grangalan to your hand.`,
        }),
      ),
    ],
    description: `When played, add Grangalan Junior to your hand.`,
  };

  export const Amalgam: CardDefinition = {
    typeId: 'amalgam' as CardDefinition['typeId'],
    name: 'Amalgam',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.createCardForPlayer({
          typeId: 'resurrected-amalgam' as CardDefinition['typeId'],
          name: 'Resurrected Amalgam',
          playRequirement: 1,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
            ]),
            ...CardEffect.passiveBoardPowerChange(-2, {
              limitTo: {
                tiles: [
                  { dx: -1, dy: 0 },
                  { dx: 1, dy: 0 },
                ],
              },
            }),
          ],
          description: `Lower the power of allied and enemy cards on affected tiles by 2 while this card is in play.`,
        }),
      ),
    ],
    description: `When destroyed, add Resurrected Amalgam to your hand.`,
  };

  export const Skeeskee: CardDefinition = {
    typeId: 'skeeskee' as CardDefinition['typeId'],
    name: 'Skeeskee',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onDestroy',
          allegiance: 'allied',
        },
        actions: [
          CardEffect.addPower(1, {
            limitTo: {
              self: true,
            },
          }),
        ],
      },
    ],
    description: `When allied cards are destroyed, raise this card's power by 1.`,
  };

  export const Griffon: CardDefinition = {
    typeId: 'griffon' as CardDefinition['typeId'],
    name: 'Griffon',
    playRequirement: 'replace',
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          +1,
          {
            limitTo: {
              tiles: [{ dx: 1, dy: 1 }],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and raise the power of allied cards on affected tiles by the replaced ally's power.`,
  };

  export const Basilisk: CardDefinition = {
    typeId: 'basilisk' as CardDefinition['typeId'],
    name: 'Basilisk',
    playRequirement: 3,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisPlayed({
        id: 'immediatelyDestroy',
        limitTo: {
          tiles: [{ dx: 1, dy: -1 }],
        },
        allegiance: 'opponent',
      }),
    ],
    description: `When played, destroy enemy cards on affected tiles.`,
  };

  export const Reapertail: CardDefinition = {
    typeId: 'reapertail' as CardDefinition['typeId'],
    name: 'Reapertail',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(-2, {
            limitTo: {
              tiles: [
                { dx: 1, dy: 1 },
                { dx: 1, dy: 2 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, lower the power of enemy cards on affected tiles by 2.`,
  };

  export const Jabberwork: CardDefinition = {
    typeId: 'jabberwork' as CardDefinition['typeId'],
    name: 'Jabberwork',
    playRequirement: 2,
    basePower: 6,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: 0, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: -1, dy: -1 },
              { dx: 0, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1`,
  };

  export const DesertSahagin: CardDefinition = {
    typeId: 'desert-sahagin' as CardDefinition['typeId'],
    name: 'Desert Sahagin',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(+4, {
            limitTo: {
              tiles: [{ dx: 0, dy: -1 }],
            },
            allegiance: 'allied',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, raise the power of allied cards on affected tiles by 4.`,
  };

  export const Cavestalker: CardDefinition = {
    typeId: 'cavestalker' as CardDefinition['typeId'],
    name: 'Cavestalker',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(-2, {
            limitTo: {
              tiles: [
                { dx: 1, dy: 1 },
                { dx: 1, dy: 0 },
                { dx: 1, dy: -1 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, lower the power of enemy cards on affected tiles by 2.`,
  };

  export const StoneGolem: CardDefinition = {
    typeId: 'stone-golem' as CardDefinition['typeId'],
    name: 'Stone Golem',
    playRequirement: 1,
    basePower: 4,
    effects: [
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(-4, {
            limitTo: {
              tiles: [{ dx: 1, dy: 0 }],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enhanced, lower the power of enemy cards on affected tiles by 4.`,
  };

  export const TwoFace: CardDefinition = {
    typeId: 'two-face' as CardDefinition['typeId'],
    name: 'Two Face',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.addPowerToTargetsWhileHasPowerStatus(+4, 'empowered', {
        limitTo: {
          tiles: [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ],
        },
      }),
      ...CardEffect.addPowerToTargetsWhileHasPowerStatus(-4, 'enfeebled', {
        limitTo: {
          tiles: [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ],
        },
      }),
    ],
    description: `Enhanced: raise power of allied and enemy cards on affected tiles by 4.
Enfeebled: lower their power by 4.`,
  };

  export const GiSpecter: CardDefinition = {
    typeId: 'gi-specter' as CardDefinition['typeId'],
    name: 'Gi Specter',
    playRequirement: 'replace',
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          -1,
          {
            limitTo: {
              tiles: [{ dx: 1, dy: -1 }],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and lower the power of allied and enemy cards on affected tiles by the replaced ally's power.`,
  };

  export const Valron: CardDefinition = {
    typeId: 'valron' as CardDefinition['typeId'],
    name: 'Valron',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+2, {
        allegiance: 'allied',
        powerStatus: {
          enfeebled: true,
        },
      }),
    ],
    description: `Raise power by 2 for each other enfeebled allied card.`,
  };

  export const Disgorgon: CardDefinition = {
    typeId: 'disgorgon' as CardDefinition['typeId'],
    name: 'Disgorgon',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips(
        [
          { dx: 1, dy: 1 },
          { dx: 1, dy: -1 },
        ],
        2,
      ),
    ],
    description: `When played, raise position ranks by 2.`,
  };

  export const Dragon: CardDefinition = {
    typeId: 'dragon' as CardDefinition['typeId'],
    name: 'Dragon',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 0, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 4.`,
  };

  export const TwinBrain: CardDefinition = {
    typeId: 'twin-brain' as CardDefinition['typeId'],
    name: 'Twin Brain',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips(
        [
          { dx: 0, dy: 2 },
          { dx: 0, dy: -2 },
        ],
        2,
      ),
    ],
    description: `When played, raise position ranks by 2.`,
  };

  export const BlackBat: CardDefinition = {
    typeId: 'black-bat' as CardDefinition['typeId'],
    name: 'Black Bat',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 0, dy: -1 },
              { dx: -1, dy: 0 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
  };

  export const BahbaVelamyu: CardDefinition = {
    typeId: 'bahba-velamyu' as CardDefinition['typeId'],
    name: 'Bahba Velamyu',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 2 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
              { dx: 1, dy: -2 },
            ],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When destroyed, lower the power of enemy cards on affected tiles by 1.`,
  };

  export const Rictus: CardDefinition = {
    typeId: 'rictus' as CardDefinition['typeId'],
    name: 'Rictus',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+1, {
        powerStatus: {
          enfeebled: true,
        },
      }),
    ],
    description: `Raise power by 1 for each other enfeebled allied and enemy card.`,
  };

  export const Adjudicator: CardDefinition = {
    typeId: 'adjudicator' as CardDefinition['typeId'],
    name: 'Adjudicator',
    playRequirement: 2,
    basePower: 1,
    effects: [
      ...CardEffect.scalePowerByNumMatchingCards(+1, {
        powerStatus: {
          empowered: true,
          enfeebled: true,
        },
      }),
    ],
    description: `Raise power by 1 for each other enhanced or enfeebled allied and enemy card.`,
  };

  export const YinAndYang: CardDefinition = {
    typeId: 'yin-&-yang' as CardDefinition['typeId'],
    name: 'Yin & Yang',
    playRequirement: 'replace',
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          +1,
          {
            limitTo: {
              tiles: [
                { dx: 0, dy: 2 },
                { dx: 0, dy: -2 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and raise the power of allied cards on affected tiles by the replaced ally's power.`,
  };

  export const DiabolicVariant: CardDefinition = {
    typeId: 'diabolic-variant' as CardDefinition['typeId'],
    name: 'Diabolic Variant',
    playRequirement: 'replace',
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          -1,
          {
            limitTo: {
              tiles: [
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and lower the power of allied and enemy cards on affected tiles by the replaced ally's power.`,
  };

  export const SpecialForcesOperator: CardDefinition = {
    typeId: 'special-forces-operator' as CardDefinition['typeId'],
    name: 'Special Forces Operator',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: 0, dy: 2 },
            { dx: 0, dy: -2 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
  };

  export const TwoCSoldierOperator: CardDefinition = {
    typeId: '2-c-soldier-operator' as CardDefinition['typeId'],
    name: '2-C SOLDIER Operator',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [{ dx: 0, dy: 2 }],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
  };

  export const Kelzmelzer: CardDefinition = {
    typeId: 'kelzmelzer' as CardDefinition['typeId'],
    name: 'Kelzmelzer',
    playRequirement: 'replace',
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          -1,
          {
            limitTo: {
              tiles: [
                { dx: 1, dy: 2 },
                { dx: 1, dy: -2 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and lower the power of allied and enemy cards on affected tiles by the replaced ally's power.`,
  };

  export const PantheraProtector: CardDefinition = {
    typeId: 'panthera-protector' as CardDefinition['typeId'],
    name: 'Panthera Protector',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(+4, {
            limitTo: {
              tiles: [{ dx: 1, dy: 0 }],
            },
            allegiance: 'allied',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `The first time this card is enchanced, raise the power of allied cards on affected tiles by 4.`,
  };

  export const Hecteyes: CardDefinition = {
    typeId: 'hecteyes' as CardDefinition['typeId'],
    name: 'Hecteyes',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisDestroyed(
        CardEffect.addPower(+3, {
          limitTo: {
            tiles: [
              { dx: -2, dy: 2 },
              { dx: 0, dy: 2 },
              { dx: 2, dy: 2 },
              { dx: 2, dy: 0 },
              { dx: 2, dy: -2 },
              { dx: 0, dy: -2 },
              { dx: -2, dy: -2 },
              { dx: -2, dy: 0 },
            ],
          },
          allegiance: 'allied',
        }),
      ),
    ],
    description: `When destroyed, raise the power of allied cards on affected tile by 3.`,
  };

  export const FloatingDeath: CardDefinition = {
    typeId: 'floating-death' as CardDefinition['typeId'],
    name: 'Floating Death',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: 0, dy: 1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
              { dx: 0, dy: -1 },
              { dx: -1, dy: -1 },
              { dx: -1, dy: 0 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
  };

  export const Ironclad: CardDefinition = {
    typeId: 'ironclad' as CardDefinition['typeId'],
    name: 'Ironclad',
    playRequirement: 3,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+3, {
        powerStatus: {
          empowered: true,
        },
        allegiance: 'opponent',
      }),
    ],
    description: `Raise power by 3 for each enhanced enemy card.`,
  };

  export const MossGrownAdamantoise: CardDefinition = {
    typeId: 'moss-grown-adamantoise' as CardDefinition['typeId'],
    name: 'Moss-Grown Adamantoise',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips(
        [
          { dx: -1, dy: 1 },
          { dx: 0, dy: 1 },
          { dx: 1, dy: 1 },
          { dx: -1, dy: -1 },
          { dx: 0, dy: -1 },
          { dx: 1, dy: -1 },
        ],
        2,
      ),
    ],
    description: `When played, raise position ranks by 3.`,
  };

  export const Cloud: CardDefinition = {
    typeId: 'cloud' as CardDefinition['typeId'],
    name: 'Cloud',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          powerLevel: 7,
        },
        actions: [
          CardEffect.addPower(+2, {
            limitTo: {
              tiles: [
                { dx: 1, dy: 0 },
                { dx: 1, dy: -1 },
                { dx: 0, dy: -1 },
                { dx: -1, dy: -1 },
                { dx: -1, dy: 0 },
                { dx: -1, dy: 1 },
                { dx: 0, dy: 1 },
                { dx: 1, dy: 1 },
              ],
            },
            allegiance: 'allied',
          }),
        ],
      },
    ],
    description: `When this card's power first reaches 7, raise the power of allied cards on affected tiles by 2.`,
    isLegendary: true,
  };

  export const Barret: CardDefinition = {
    typeId: 'barret' as CardDefinition['typeId'],
    name: 'Barret',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 2, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-8, {
          limitTo: {
            tiles: [{ dx: 2, dy: 0 }],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 8.`,
    isLegendary: true,
  };

  export const Tifa: CardDefinition = {
    typeId: 'tifa' as CardDefinition['typeId'],
    name: 'Tifa',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: -2 },
      ]),
      {
        trigger: {
          id: 'onGameEnd',
          wonRow: true,
        },
        actions: [
          {
            id: 'addScoreBonusForPlayer',
            player: 'controller',
            amount: 5,
          },
        ],
      },
    ],
    description: `When you win the lane, receive a score bonus of 5.`,
    isLegendary: true,
  };

  export const Aerith: CardDefinition = {
    typeId: 'aerith' as CardDefinition['typeId'],
    name: 'Aerith',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
    isLegendary: true,
  };

  export const RedXIII: CardDefinition = {
    typeId: 'red-xiii' as CardDefinition['typeId'],
    name: 'Red XIII',
    playRequirement: 1,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(-2, {
            limitTo: {
              tiles: [
                { dx: 0, dy: 2 },
                { dx: 2, dy: 2 },
                { dx: 2, dy: 0 },
                { dx: 2, dy: -2 },
                { dx: 0, dy: -2 },
                { dx: -2, dy: -2 },
                { dx: -2, dy: 0 },
                { dx: -2, dy: 2 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, lower the power of enemy cards on affected tiles by 2.`,
    isLegendary: true,
  };

  export const Yuffie: CardDefinition = {
    typeId: 'yuffie' as CardDefinition['typeId'],
    name: 'Yuffie',
    playRequirement: 'replace',
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          -1,
          {
            limitTo: {
              tiles: [
                { dx: 0, dy: 1 },
                { dx: 1, dy: 1 },
                { dx: 1, dy: 0 },
                { dx: 1, dy: -1 },
                { dx: 0, dy: -1 },
                { dx: -1, dy: -1 },
                { dx: -1, dy: 1 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and lower the power of allied and enemy cards on affected tiles by the replaced ally's power.`,
    isLegendary: true,
  };

  export const CaitSith: CardDefinition = {
    typeId: 'cait-sith' as CardDefinition['typeId'],
    name: 'Cait Sith',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'moogle' as CardDefinition['typeId'],
          name: 'Moogle',
          playRequirement: 2,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: 0, dy: 1 },
              { dx: 1, dy: 0 },
            ]),
            ...CardEffect.passiveBoardPowerChange(+3, {
              limitTo: {
                tiles: [{ dx: -1, dy: 0 }],
              },
              allegiance: 'allied',
            }),
          ],
          description: `Raise the power of allied cards on affected tiles by 3 while this card is in play`,
        }),
      ),
    ],
    description: `When played, add Moogle to your hand.`,
    isLegendary: true,
  };

  export const Cid: CardDefinition = {
    typeId: 'cid' as CardDefinition['typeId'],
    name: 'Cid',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'the-tiny-bronco' as CardDefinition['typeId'],
          name: 'The Tiny Bronco',
          playRequirement: 2,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayedAddPips(
              [
                { dx: 0, dy: 1 },
                { dx: 1, dy: 0 },
                { dx: 2, dy: 1 },
              ],
              2,
            ),
          ],
          description: `When played, raise position ranks by 2.`,
        }),
      ),
    ],
    description: `When played, add The Tiny Bronco to your hand.`,
    isLegendary: true,
  };

  export const Vincent: CardDefinition = {
    typeId: 'vincent' as CardDefinition['typeId'],
    name: 'Vincent',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),

      CardEffect.onThisDestroyed(
        CardEffect.createCardForPlayer({
          typeId: 'galian-beast' as CardDefinition['typeId'],
          name: 'Galian Beast',
          playRequirement: 2,
          basePower: 4,
          effects: [
            CardEffect.onThisPlayed(
              CardEffect.addPower(-1, {
                limitTo: {
                  tiles: [
                    { dx: 0, dy: 2 },
                    { dx: 1, dy: 2 },
                    { dx: 2, dy: 1 },
                    { dx: 2, dy: 0 },
                    { dx: 2, dy: -1 },
                    { dx: 1, dy: -2 },
                    { dx: 0, dy: -2 },
                    { dx: -1, dy: -2 },
                    { dx: -2, dy: -1 },
                    { dx: -2, dy: 0 },
                    { dx: -2, dy: 1 },
                    { dx: -1, dy: 2 },
                  ],
                },
              }),
            ),
          ],
          description: `When played, lower the power of allied and enemy cards on affected tiles by 1.`,
        }),
      ),
    ],
    description: `When destroyed, add Galian Beast to your hand.`,
  };

  export const Ifrit: CardDefinition = {
    typeId: 'ifrit' as CardDefinition['typeId'],
    name: 'Ifrit',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+2, {
        powerStatus: {
          empowered: true,
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise power by 2 for each other enhanced allied card.`,
    isLegendary: true,
  };

  export const Shiva: CardDefinition = {
    typeId: 'shiva' as CardDefinition['typeId'],
    name: 'Shiva',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.spawnCardsOnCapturedTiles((numPips) => {
          return {
            typeId: 'diamond-dust' as CardDefinition['typeId'],
            name: 'Diamond Dust',
            playRequirement: 0,
            basePower: 2 * numPips,
            effects: [],
            // this is the description in QB; it's not really accurate to how the card is modeled, but that's ok
            description: `When spawned, if this replaced 2 Pawns, this gains 2 power. If this replaced 3, this gains 4 power instead.`,
          };
        }),
      ),
    ],
    description: `When played, spawn Diamond Dust of power 2, 4, or 6 in empty positions.`,
    isLegendary: true,
  };

  export const Ramuh: CardDefinition = {
    typeId: 'ramuh' as CardDefinition['typeId'],
    name: 'Ramuh',
    playRequirement: 3,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 2, dy: 2 },
        { dx: 1, dy: -1 },
        { dx: 2, dy: -2 },
        { dx: -1, dy: -1 },
        { dx: -2, dy: -2 },
        { dx: -1, dy: 1 },
        { dx: -2, dy: 2 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-3, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 1 },
              { dx: 2, dy: 2 },
              { dx: 1, dy: -1 },
              { dx: 2, dy: -2 },
              { dx: -1, dy: -1 },
              { dx: -2, dy: -2 },
              { dx: -1, dy: 1 },
              { dx: -2, dy: 2 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 3.`,
    isLegendary: true,
  };

  export const Titan: CardDefinition = {
    typeId: 'titan' as CardDefinition['typeId'],
    name: 'Titan',
    playRequirement: 2,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips(
        [
          { dx: 0, dy: 1 },
          { dx: 1, dy: 0 },
          { dx: 0, dy: -1 },
        ],
        2,
      ),
    ],
    description: `When played, raise position ranks by 2.`,
    isLegendary: true,
  };

  export const Kujata: CardDefinition = {
    typeId: 'kujata' as CardDefinition['typeId'],
    name: 'Kujata',
    playRequirement: 3,
    basePower: 6,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(-5, {
            limitTo: {
              tiles: [
                { dx: -1, dy: 0 },
                { dx: 1, dy: 1 },
                { dx: 1, dy: -1 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enhanced, lower the power of enemy cards on affected tiles by 5.`,
    isLegendary: true,
  };

  export const Odin: CardDefinition = {
    typeId: 'odin' as CardDefinition['typeId'],
    name: 'Odin',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+2, {
        powerStatus: {
          empowered: true,
        },
        allegiance: 'opponent',
      }),
    ],
    description: `Raise power by 2 for each enhanced enemy card.`,
    isLegendary: true,
  };

  export const Phoenix: CardDefinition = {
    typeId: 'phoenix' as CardDefinition['typeId'],
    name: 'Phoenix',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 },
      ]),
      CardEffect.onThisDestroyed(
        CardEffect.addPower(+5, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: -1 },
              { dx: -1, dy: -1 },
            ],
          },
          allegiance: 'allied',
        }),
      ),
    ],
    description: `When destroyed, raise the power of allied cards on affected tiles by 5.`,
    isLegendary: true,
  };

  export const Leviathan: CardDefinition = {
    typeId: 'leviathan' as CardDefinition['typeId'],
    name: 'Leviathan',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 2, dy: 0 },
        { dx: 0, dy: -2 },
        { dx: -2, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(-3, {
        limitTo: {
          tiles: [
            { dx: -2, dy: 2 },
            { dx: 0, dy: 2 },
            { dx: 2, dy: 2 },
            { dx: 2, dy: 0 },
            { dx: 2, dy: -2 },
            { dx: 0, dy: -2 },
            { dx: -2, dy: -2 },
            { dx: -2, dy: 0 },
          ],
        },
        allegiance: 'opponent',
      }),
    ],
    description: `Lower the power of enemy cards on affected tiles by 3 while this card is in play.`,
    isLegendary: true,
  };

  export const Alexander: CardDefinition = {
    typeId: 'alexander' as CardDefinition['typeId'],
    name: 'Alexander',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+3, {
        powerStatus: {
          enfeebled: true,
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise power by 3 for each other enfeebled allied card.`,
    isLegendary: true,
  };

  export const Bahamut: CardDefinition = {
    typeId: 'bahamut' as CardDefinition['typeId'],
    name: 'Bahamut',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 2, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.addPower(-5, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 0 },
              { dx: 2, dy: 0 },
            ],
          },
          allegiance: 'opponent',
        }),
      ),
    ],
    description: `When played, lower the power of enemy cards on affected tiles by 5.`,
    isLegendary: true,
  };

  export const BahamutArisen: CardDefinition = {
    typeId: 'bahamut-arisen' as CardDefinition['typeId'],
    name: 'Bahamut Arisen',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.spawnCardsOnCapturedTiles((numPips) => {
          return {
            typeId: `elementals-${numPips}` as CardDefinition['typeId'],
            name: `Elementals ${numPips}`,
            playRequirement: 0,
            basePower: 1,
            effects: [
              CardEffect.onThisDestroyed(
                CardEffect.addPower(+numPips, {
                  limitTo: {
                    tiles: [
                      { dx: 0, dy: 1 },
                      { dx: 1, dy: 1 },
                      { dx: 1, dy: 0 },
                      { dx: 1, dy: -1 },
                      { dx: 0, dy: -1 },
                      { dx: -1, dy: -1 },
                      { dx: -1, dy: 0 },
                      { dx: -1, dy: 1 },
                    ],
                  },
                }),
              ),
            ],
            description: `When destroyed, raise the power of allied and enemy cards on affected tiles by ${numPips}.`,
          };
        }),
      ),
    ],
    description: `When played, spawn Elementals—cards that enhance when destroyed—in your empty positions.`,
  };

  export const Gilgamesh: CardDefinition = {
    typeId: 'gilgamesh' as CardDefinition['typeId'],
    name: 'Gilgamesh',
    playRequirement: 'replace',
    basePower: 3,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(
          -1,
          {
            limitTo: {
              tiles: [
                { dx: -2, dy: 2 },
                { dx: 2, dy: 2 },
                { dx: 2, dy: -2 },
                { dx: -2, dy: -2 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: ``,
    isLegendary: true,
  };

  export const ChocoboAndMoogle: CardDefinition = {
    typeId: 'chocobo-&-moogle' as CardDefinition['typeId'],
    name: 'Chocobo & Moogle',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+1, {
        powerStatus: {
          empowered: true,
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise power by 1 for each other ehanced allied card.`,
    isLegendary: true,
  };

  export const FatChocobo: CardDefinition = {
    typeId: 'fat-chocobo' as CardDefinition['typeId'],
    name: 'Fat Chocobo',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 1, dy: 1 },
        { dx: 2, dy: 0 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: -2 },
        { dx: -1, dy: -1 },
        { dx: -2, dy: 0 },
        { dx: -1, dy: 1 },
      ]),
    ],
    description: `Creates a surfeit of positions around it when played.`,
    isLegendary: true,
  };

  export const PoshChocobo: CardDefinition = {
    typeId: 'posh-chocobo' as CardDefinition['typeId'],
    name: 'Posh Chocobo',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onGameEnd',
          wonRow: true,
        },
        actions: [
          {
            id: 'addScoreBonusForPlayer',
            player: 'controller',
            amount: +3,
          },
        ],
      },
    ],
    description: `When you win the lane, receive a score bonus of 3.`,
    isLegendary: true,
  };

  export const MoogleTrio: CardDefinition = {
    typeId: 'moogle-trio' as CardDefinition['typeId'],
    name: 'Moogle Trio',
    playRequirement: 2,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'moogle-mage' as CardDefinition['typeId'],
          name: 'Moogle Mage',
          playRequirement: 1,
          basePower: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([{ dx: 2, dy: 2 }]),
            CardEffect.onThisPlayed(
              CardEffect.addPower(-4, {
                limitTo: {
                  tiles: [{ dx: 2, dy: 2 }],
                },
                allegiance: 'opponent',
              }),
            ),
          ],
          description: `When played, lower the power of enemy cards on affeted tiles by 4.`,
        }),
        CardEffect.createCardForPlayer({
          typeId: 'moogle-bard' as CardDefinition['typeId'],
          name: 'Moogle Bard',
          playRequirement: 1,
          basePower: 1,
          effects: [
            CardEffect.onThisPlayedAddPips([{ dx: 1, dy: -1 }]),
            ...CardEffect.passiveBoardPowerChange(+2, {
              limitTo: {
                tiles: [
                  { dx: 1, dy: -1 },
                  { dx: 1, dy: -2 },
                ],
              },
              allegiance: 'allied',
            }),
          ],
          description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
        }),
      ),
    ],
    description: `When played, add both Moogle Mage and Moogle Bard to your hand.`,
    isLegendary: true,
  };

  export const MagicPot: CardDefinition = {
    typeId: 'magic-pot' as CardDefinition['typeId'],
    name: 'Magic Pot',
    playRequirement: 3,
    basePower: 1,
    effects: [
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: -1, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: true,
  };

  export const MateriaGuardian: CardDefinition = {
    typeId: 'materia-guardian' as CardDefinition['typeId'],
    name: 'Materia Guardian',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: -2 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(-6, {
            limitTo: {
              tiles: [
                { dx: -2, dy: 2 },
                { dx: -2, dy: -2 },
                { dx: -1, dy: 2 },
                { dx: -1, dy: -2 },
                { dx: 1, dy: 2 },
                { dx: 1, dy: -2 },
                { dx: 2, dy: 2 },
                { dx: 2, dy: -2 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, lower the power of enemy cards on affected tiles by 6.`,
    isLegendary: true,
  };

  export const Midgardsormr: CardDefinition = {
    typeId: 'midgardsormr' as CardDefinition['typeId'],
    name: 'Midgardsormr',
    playRequirement: 3,
    basePower: 6,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onDestroy',
        },
        actions: [
          CardEffect.addPower(+1, {
            limitTo: {
              self: true,
            },
          }),
        ],
      },
    ],
    description: `When allied and enemy cards are destroyed, raise this card's power by 1.`,
    isLegendary: true,
  };

  export const MythrilGolem: CardDefinition = {
    typeId: 'mythril-golem' as CardDefinition['typeId'],
    name: 'MythrilGolem',
    playRequirement: 3,
    basePower: 8,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
    ],
    description: `Possesses a crystal-hard resolve and an overwhelming amount of power.`,
    isLegendary: true,
  };

  export const TerrorOfTheDeep: CardDefinition = {
    typeId: 'terror-of-the-deep' as CardDefinition['typeId'],
    name: 'Terror of the Deep',
    playRequirement: 3,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(-1, {
        limitTo: {
          tiles: [
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
          ],
        },
      }),
    ],
    description: `Lower the power of allied and enemy cards on affected tiles by 1 while this card is in play.`,
    isLegendary: true,
  };

  export const Gastropod: CardDefinition = {
    typeId: 'gastropod' as CardDefinition['typeId'],
    name: 'Gastropod',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(-4, {
            limitTo: {
              tiles: [
                { dx: -2, dy: 2 },
                { dx: -2, dy: 1 },
                { dx: -2, dy: -1 },
                { dx: -2, dy: -2 },
                { dx: 2, dy: 2 },
                { dx: 2, dy: 1 },
                { dx: 2, dy: -1 },
                { dx: 2, dy: -2 },
              ],
            },
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enhanced, lower the power of allied and enemy cards on affected tiles by 4.`,
    isLegendary: true,
  };

  export const CustomValkyrie: CardDefinition = {
    typeId: 'custom-valkyrie' as CardDefinition['typeId'],
    name: 'Custom Valkyrie',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: -1, dy: 1 },
          { dx: -1, dy: -1 },
          { dx: 1, dy: 1 },
          { dx: 1, dy: -1 },
        ]),
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: -1, dy: -1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 4.`,
    isLegendary: true,
  };

  export const Gigatrice: CardDefinition = {
    typeId: 'gigatrice' as CardDefinition['typeId'],
    name: 'Gigatrice',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: 0, dy: 2 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
          { dx: 0, dy: -2 },
          { dx: 1, dy: 2 },
          { dx: 1, dy: -2 },
        ]),
        {
          id: 'immediatelyDestroy',
          limitTo: {
            tiles: [
              { dx: 1, dy: 2 },
              { dx: 1, dy: -2 },
            ],
          },
        },
      ),
    ],
    description: `When played, destroy allied and enemy cards on affected tiles.`,
    isLegendary: true,
  };

  export const Dyne: CardDefinition = {
    typeId: 'dyne' as CardDefinition['typeId'],
    name: 'Dyne',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: 1, dy: 2 },
          { dx: 1, dy: -2 },
          { dx: 2, dy: 1 },
          { dx: 2, dy: -1 },
        ]),
        CardEffect.addPower(-5, {
          limitTo: {
            tiles: [
              { dx: 1, dy: 2 },
              { dx: 1, dy: -2 },
              { dx: 2, dy: 1 },
              { dx: 2, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 5.`,
    isLegendary: true,
  };

  export const AnuranSuppressor: CardDefinition = {
    typeId: 'anuran-suppressor' as CardDefinition['typeId'],
    name: 'Anuran Suppressor',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -2 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -2 },
      ]),
      {
        trigger: {
          id: 'onDestroy',
          allegiance: 'opponent',
        },
        actions: [
          CardEffect.addPower(+2, {
            limitTo: {
              self: true,
            },
          }),
        ],
      },
    ],
    description: `When enemy cards are destroyed, raise this card's power by 2.`,
    isLegendary: true,
  };

  export const SpecimenH1024: CardDefinition = {
    typeId: 'specimen-h1024' as CardDefinition['typeId'],
    name: 'Specimen H1024',
    playRequirement: 3,
    basePower: 6,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [
            { dx: -2, dy: 2 },
            { dx: -2, dy: 0 },
            { dx: -2, dy: -2 },
            { dx: 0, dy: 2 },
            { dx: 0, dy: -2 },
            { dx: 2, dy: 2 },
            { dx: 2, dy: 0 },
            { dx: 2, dy: -2 },
          ],
        },
      }),
    ],
    description: `Raise the power of allied and enemy cards on affected tiles by 3 while this card is in play.`,
    isLegendary: true,
  };

  export const CrimsonMareMkII: CardDefinition = {
    typeId: 'crimson-mare-mk-ii' as CardDefinition['typeId'],
    name: 'Crimson Mare Mk. II',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          changeDirection: 'decreasing',
        },
        actions: [
          CardEffect.addPower(-5, {
            limitTo: {
              tiles: [
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
                { dx: 1, dy: 0 },
              ],
            },
          }),
        ],
        maxActivations: 1,
      },
    ],
    description: `When first enfeebled, lower the power of allied and enemy cards on affected tiles by 5.`,
    isLegendary: true,
  };

  export const GiNattak: CardDefinition = {
    typeId: 'gi-nattak' as CardDefinition['typeId'],
    name: 'Gi Nattak',
    playRequirement: 'replace',
    basePower: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ]),
        CardEffect.addPower(
          +1,
          {
            limitTo: {
              tiles: [
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
              ],
            },
          },
          'replaced',
        ),
      ),
    ],
    description: `Replace an ally and raise the power of allied cards on affected tiles by the replaced ally's power.`,
    isLegendary: true,
  };

  export const ForgottenSpecimen: CardDefinition = {
    typeId: 'forgottenspecimen' as CardDefinition['typeId'],
    name: 'ForgottenSpecimen',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 2 },
        { dx: 1, dy: 1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+3, {
        limitTo: {
          tiles: [
            { dx: -1, dy: -1 },
            { dx: -1, dy: -2 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
    isLegendary: true,
  };

  export const DonCorneoAndAbzu: CardDefinition = {
    typeId: 'don-corneo-&-abzu' as CardDefinition['typeId'],
    name: 'Don Corneo & Abzu',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          typeId: 'cacneo' as CardDefinition['typeId'],
          name: 'Cacneo',
          playRequirement: 2,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayedAddPips([
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
            ]),
            ...CardEffect.passiveBoardPowerChange(+3, {
              limitTo: {
                tiles: [
                  { dx: 1, dy: 2 },
                  { dx: 1, dy: -2 },
                ],
              },
              allegiance: 'allied',
            }),
          ],
          description: `Raise the power of allied cards on affected tiles by 3 while this card is in play.`,
        }),
        CardEffect.createCardForPlayer({
          typeId: 'donberry' as CardDefinition['typeId'],
          name: 'Donberry',
          playRequirement: 2,
          basePower: 2,
          effects: [
            CardEffect.onThisPlayed(CardEffect.addPips([{ dx: 1, dy: 0 }]), {
              id: 'immediatelyDestroy',
              limitTo: {
                tiles: [{ dx: 1, dy: 0 }],
              },
              allegiance: 'opponent',
            }),
          ],
          description: `When played, destroy enemy cards on affected tiles`,
        }),
      ),
    ],
    description: `When played, add both Cacneo and Donberry to your hand.`,
    isLegendary: true,
  };

  export const RedDragon: CardDefinition = {
    typeId: 'red-dragon' as CardDefinition['typeId'],
    name: 'Red Dragon',
    playRequirement: 3,
    basePower: 6,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: 0, dy: 2 },
          { dx: 0, dy: -2 },
          { dx: 1, dy: 1 },
          { dx: 1, dy: -1 },
          { dx: 2, dy: 0 },
        ]),
        CardEffect.addPower(-4, {
          limitTo: {
            tiles: [
              { dx: 0, dy: 2 },
              { dx: 0, dy: -2 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: -1 },
              { dx: 2, dy: 0 },
            ],
          },
        }),
      ),
    ],
    description: `When played, lower the power of allied and enemy cards on affected tiles by 4.`,
    isLegendary: true,
  };

  export const DemonGate: CardDefinition = {
    typeId: 'demon-gate' as CardDefinition['typeId'],
    name: 'Demon Gate',
    playRequirement: 3,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -1 },
      ]),
      {
        trigger: {
          id: 'onDestroy',
          limitTo: {
            self: true,
          },
        },
        actions: [
          CardEffect.addPower(-9, {
            limitTo: {
              tiles: [
                { dx: -1, dy: 1 },
                { dx: -1, dy: 0 },
                { dx: -1, dy: -1 },
                { dx: 1, dy: 1 },
                { dx: 1, dy: 0 },
                { dx: 1, dy: -1 },
              ],
            },
            allegiance: 'opponent',
          }),
        ],
      },
    ],
    description: `When destroyed, lower the power of enemy cards on affected tiles by 9.`,
    isLegendary: true,
  };

  export const Reno: CardDefinition = {
    typeId: 'reno' as CardDefinition['typeId'],
    name: 'Reno',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: -1, dy: -1 },
            { dx: 0, dy: -2 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: true,
  };

  export const Rude: CardDefinition = {
    typeId: 'rude' as CardDefinition['typeId'],
    name: 'Rude',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: -1, dy: 1 },
            { dx: 0, dy: 2 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tiles by 2 while this card is in play.`,
    isLegendary: true,
  };

  export const Elena: CardDefinition = {
    typeId: 'elena' as CardDefinition['typeId'],
    name: 'Elena',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(-99, {
            limitTo: {
              tiles: [{ dx: 1, dy: 0 }],
            },
          }),
        ],
      },
    ],
    description: `When first enhanced, lower the power of allied and enemy cards on affected tiles by 99.`,
    isLegendary: true,
  };

  export const Tseng: CardDefinition = {
    typeId: 'tseng' as CardDefinition['typeId'],
    name: 'Tseng',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      {
        trigger: {
          id: 'onPowerChange',
          limitTo: {
            self: true,
          },
          changeDirection: 'increasing',
        },
        actions: [
          CardEffect.addPower(+4, {
            limitTo: {
              tiles: [{ dx: 2, dy: 0 }],
            },
          }),
        ],
      },
    ],
    description: `The first time this card is enhanced, raise the power of allied cards on affected tiles by 4.`,
    isLegendary: true,
  };

  export const Rufus: CardDefinition = {
    typeId: 'rufus' as CardDefinition['typeId'],
    name: 'Rufus',
    playRequirement: 2,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 2 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: -2 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: 1, dy: -2 },
      ]),
    ],
    description: `Creates an intimidatingly large number of positions around him when played.`,
    isLegendary: true,
  };

  export const Roche: CardDefinition = {
    typeId: 'roche' as CardDefinition['typeId'],
    name: 'Roche',
    playRequirement: 2,
    basePower: 5,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPips([
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
          { dx: 1, dy: 0 },
        ]),
        CardEffect.addPower(-1, {
          limitTo: {
            tiles: [
              { dx: -2, dy: 2 },
              { dx: -2, dy: 0 },
              { dx: -2, dy: -2 },
              { dx: -1, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: -1, dy: -1 },
              { dx: 0, dy: 2 },
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
              { dx: 0, dy: -2 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
              { dx: 2, dy: 2 },
              { dx: 2, dy: 0 },
              { dx: 2, dy: -2 },
            ],
          },
          allegiance: 'allied',
        }),
      ),
    ],
    description: `When played, lower the power of allied cards on affected tiles by 1.`,
    isLegendary: true,
  };

  export const JSquad: CardDefinition = {
    typeId: 'j-squad' as CardDefinition['typeId'],
    name: 'J-Squad',
    playRequirement: 3,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.spawnCardsOnCapturedTiles((numPips) => {
          return {
            typeId: `hype-johnnys-${numPips}` as CardDefinition['typeId'],
            name: `Hype Johnnys ${numPips}`,
            playRequirement: 0,
            basePower: 1,
            effects: [
              ...CardEffect.passiveBoardPowerChange(+numPips, {
                limitTo: {
                  tiles: [
                    { dx: -2, dy: 2 },
                    { dx: -2, dy: 0 },
                    { dx: -2, dy: -2 },
                    { dx: 0, dy: 2 },
                    { dx: 0, dy: -2 },
                    { dx: 2, dy: 2 },
                    { dx: 2, dy: 0 },
                    { dx: 2, dy: -2 },
                  ],
                },
              }),
            ],
            description: `Raise the power of allied and enemy cards on affected tiles by ${numPips} while this card is in play.`,
          };
        }),
      ),
    ],
    description: `When played, spawn Hype Johnnys—cards that enhance while in play—in your empty positions.`,
    isLegendary: true,
  };

  export const ChocoboJockey: CardDefinition = {
    typeId: 'chocobo-jockey' as CardDefinition['typeId'],
    name: 'Chocobo Jockey',
    playRequirement: 2,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([{ dx: 1, dy: 0 }]),
      {
        trigger: {
          id: 'onGameEnd',
          wonRow: true,
        },
        actions: [
          {
            id: 'addScoreBonusForPlayer',
            player: 'controller',
            amount: +10,
          },
        ],
      },
    ],
    description: `When you win the lane, receive a score bonus of 10.`,
    isLegendary: true,
  };

  export const SpaceRanger: CardDefinition = {
    typeId: 'space-ranger' as CardDefinition['typeId'],
    name: 'Space Ranger',
    playRequirement: 1,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+1, {
        powerStatus: {
          empowered: true,
        },
        allegiance: 'opponent',
      }),
    ],
    description: `Raise power by 1 for each enhanced enemy card.`,
    isLegendary: true,
  };

  export const HauntedHotel: CardDefinition = {
    typeId: 'hauntedhotel' as CardDefinition['typeId'],
    name: 'Haunted Hotel',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ]),
      ...CardEffect.passiveBoardPowerChange(+2, {
        limitTo: {
          tiles: [
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
          ],
        },
        allegiance: 'allied',
      }),
    ],
    description: `Raise the power of allied cards on affected tilles by 2 while this card is in play.`,
    isLegendary: true,
  };

  export const Skywheel: CardDefinition = {
    typeId: 'skywheel' as CardDefinition['typeId'],
    name: 'Skywheel',
    playRequirement: 3,
    basePower: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 },
        { dx: -1, dy: 2 },
        { dx: -1, dy: -2 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: 2, dy: 1 },
        { dx: 2, dy: -1 },
      ]),
    ],
    description: `Adds positions in the shape of a certain Gold Saucer attraction.`,
    isLegendary: true,
  };

  export const Loveless: CardDefinition = {
    typeId: 'loveless' as CardDefinition['typeId'],
    name: 'Loveless',
    playRequirement: 1,
    basePower: 1,
    effects: [
      CardEffect.onThisPlayed(
        CardEffect.addPower(+1, {
          limitTo: {
            tiles: [
              { dx: -1, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: -1, dy: -1 },
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
              { dx: 1, dy: 1 },
              { dx: 1, dy: 0 },
              { dx: 1, dy: -1 },
            ],
          },
        }),
      ),
    ],
    description: `When played, raise the power of allied and enemy cards on affected tiles by 1.`,
    isLegendary: true,
  };

  export const SaucerSquad: CardDefinition = {
    typeId: 'saucer-squad' as CardDefinition['typeId'],
    name: 'Saucer Squad',
    playRequirement: 2,
    basePower: 3,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: -2 },
      ]),
    ],
    description: `Makes use of its adorable nature to enliven the battlefield.`,
    isLegendary: true,
  };

  export const Dio: CardDefinition = {
    typeId: 'dio' as CardDefinition['typeId'],
    name: 'Dio',
    playRequirement: 3,
    basePower: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
      ]),
      ...CardEffect.scalePowerByNumMatchingCards(+1, {
        powerStatus: {
          empowered: true,
        },
      }),
    ],
    description: `Raise power by 1 for each other enhanced allied and enemy card.`,
    isLegendary: true,
  };
}

export const FF7_LIBRARY = [
  FF7Library.SecurityOfficer,
  FF7Library.RiotTrooper,
  FF7Library.Grenadier,
  FF7Library.JUnitSweeper,
  FF7Library.QueenBee,
  FF7Library.Toxirat,
  FF7Library.Levrikon,
  FF7Library.GrasslandsWolf,
  FF7Library.Mu,
  FF7Library.Mandragora,
  FF7Library.Elphadunk,
  FF7Library.Cactuar,
  FF7Library.CrystallineCrab,
  FF7Library.Quetzalcoatl,
  FF7Library.Zu,
  FF7Library.DevilRider,
  FF7Library.Screamer,
  FF7Library.Flan,
  FF7Library.Crawler,
  FF7Library.Archdragon,
  FF7Library.Ogre,
  FF7Library.Deathwheel,
  FF7Library.Fleetwing,
  FF7Library.Zemzelett,
  FF7Library.Ignilisk,
  FF7Library.Capparwire,
  FF7Library.MindFlayer,
  FF7Library.Scrutineye,
  FF7Library.HellRiderII,
  FF7Library.Flametrooper,
  FF7Library.Spearhawk,
  FF7Library.SeaDevil,
  FF7Library.Shoalopod,
  FF7Library.CrownLance,
  FF7Library.TonberryKing,
  FF7Library.SandhogPie,
  FF7Library.Bloatfloat,
  FF7Library.Bagnadrana,
  FF7Library.Cockatrice,
  FF7Library.Heatseeker,
  FF7Library.Bomb,
  FF7Library.Thug,
  FF7Library.DeathClaw,
  FF7Library.Landworm,
  FF7Library.Sandspitter,
  FF7Library.Chimera,
  FF7Library.Joker,
  FF7Library.Amphidex,
  FF7Library.Frightflower,
  FF7Library.Gagighandi,
  FF7Library.InsectoidChimera,
  FF7Library.Gigantoad,
  FF7Library.Maloceros,
  FF7Library.Grandhorn,
  FF7Library.GreatMalboro,
  FF7Library.Grangalan,
  FF7Library.Amalgam,
  FF7Library.Griffon,
  FF7Library.Basilisk,
  FF7Library.Reapertail,
  FF7Library.Jabberwork,
  FF7Library.DesertSahagin,
  FF7Library.Cavestalker,
  FF7Library.StoneGolem,
  FF7Library.TwoFace,
  FF7Library.GiSpecter,
  FF7Library.Valron,
  FF7Library.Disgorgon,
  FF7Library.Dragon,
  FF7Library.TwinBrain,
  FF7Library.BlackBat,
  FF7Library.BahbaVelamyu,
  FF7Library.Rictus,
  FF7Library.Adjudicator,
  FF7Library.YinAndYang,
  FF7Library.DiabolicVariant,
  FF7Library.SpecialForcesOperator,
  FF7Library.TwoCSoldierOperator,
  FF7Library.Kelzmelzer,
  FF7Library.PantheraProtector,
  FF7Library.Hecteyes,
  FF7Library.FloatingDeath,
  FF7Library.Ironclad,
  FF7Library.MossGrownAdamantoise,
  FF7Library.Cloud,
  FF7Library.Barret,
  FF7Library.Tifa,
  FF7Library.Aerith,
  FF7Library.RedXIII,
  FF7Library.Yuffie,
  FF7Library.CaitSith,
  FF7Library.Cid,
  FF7Library.Vincent,
  FF7Library.Ifrit,
  FF7Library.Shiva,
  FF7Library.Ramuh,
  FF7Library.Titan,
  FF7Library.Kujata,
  FF7Library.Odin,
  FF7Library.Phoenix,
  FF7Library.Leviathan,
  FF7Library.Alexander,
  FF7Library.Bahamut,
  FF7Library.BahamutArisen,
  FF7Library.Gilgamesh,
  FF7Library.ChocoboAndMoogle,
  FF7Library.FatChocobo,
  FF7Library.PoshChocobo,
  FF7Library.MoogleTrio,
  FF7Library.MagicPot,
  FF7Library.MateriaGuardian,
  FF7Library.Midgardsormr,
  FF7Library.MythrilGolem,
  FF7Library.TerrorOfTheDeep,
  FF7Library.Gastropod,
  FF7Library.CustomValkyrie,
  FF7Library.Gigatrice,
  FF7Library.Dyne,
  FF7Library.AnuranSuppressor,
  FF7Library.SpecimenH1024,
  FF7Library.CrimsonMareMkII,
  FF7Library.GiNattak,
  FF7Library.ForgottenSpecimen,
  FF7Library.DonCorneoAndAbzu,
  FF7Library.RedDragon,
  FF7Library.DemonGate,
  FF7Library.Reno,
  FF7Library.Rude,
  FF7Library.Elena,
  FF7Library.Tseng,
  FF7Library.Rufus,
  FF7Library.Roche,
  FF7Library.JSquad,
  FF7Library.ChocoboJockey,
  FF7Library.SpaceRanger,
  FF7Library.HauntedHotel,
  FF7Library.Skywheel,
  FF7Library.Loveless,
  FF7Library.SaucerSquad,
];
