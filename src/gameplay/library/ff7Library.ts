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
    effects: [CardEffect.onThisPlayed(CardEffect.addPower([{ dx: 2, dy: 0 }], -4, { opponent: true }))],
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
        CardEffect.addPower([{ dx: 1, dy: -1 }], -3, {
          allied: true,
          opponent: true,
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
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: -1 }], +1, {
        allied: true,
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
      ...CardEffect.passiveBoardPowerChange([{ dx: 1, dy: -2 }], +3, {
        allied: true,
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
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: 1 }], +2, {
        allied: true,
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
        CardEffect.addPower([{ dx: 1, dy: 0 }], -3, {
          opponent: true,
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
        CardEffect.addPower(
          [
            { dx: 2, dy: 2 },
            { dx: 2, dy: -2 },
          ],
          -3,
          {
            allied: true,
            opponent: true,
          },
        ),
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
      ...CardEffect.passiveBoardPowerChange([{ dx: -1, dy: 0 }], +3, {
        allied: true,
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
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 1, dy: 0 },
          { dx: 0, dy: -2 },
        ],
        +2,
        { allied: true },
      ),
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
        CardEffect.addPower(
          [
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
          ],
          -1,
          { allied: true, opponent: true },
        ),
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
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 0, dy: 1 },
          { dx: 1, dy: 1 },
          { dx: 0, dy: -1 },
          { dx: 1, dy: -1 },
        ],
        -1,
        { allied: true, opponent: true },
      ),
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
      ...CardEffect.passiveBoardPowerChange(
        [
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ],
        +1,
        { allied: true, opponent: true },
      ),
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
        CardEffect.addPower(
          [
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
          ],
          -3,
          {
            opponent: true,
          },
        ),
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
        CardEffect.addPower(
          [
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
          ],
          -3,
          {
            allied: true,
            opponent: true,
          },
        ),
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
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: -1 }], +2, {
        allied: true,
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
        trigger: { id: 'onPlay', allied: true },
        actions: [{ id: 'addPower', self: true, amount: +1 }],
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
      ...CardEffect.passiveBoardPowerChange([{ dx: 0, dy: 1 }], +4, {
        allied: true,
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
        CardEffect.addPower(
          [
            { dx: 1, dy: -1 },
            { dx: 1, dy: -2 },
          ],
          -2,
          { allied: true, opponent: true },
        ),
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
        trigger: { id: 'onDestroy', allied: true },
        actions: [{ id: 'addPower', self: true, amount: +2 }],
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
        CardEffect.addPower(
          [
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
          ],
          +3,
          { allied: true },
        ),
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
        CardEffect.addPower([{ dx: 2, dy: 0 }], -4, {
          allied: true,
          opponent: true,
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
        trigger: { id: 'onPlay', opponent: true },
        actions: [{ id: 'addPower', self: true, amount: +1 }],
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
        tiles: [{ dx: 1, dy: 0 }],
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
        CardEffect.addPower(
          [
            { dx: -1, dy: 1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: -1, dy: -1 },
            { dx: -1, dy: 0 },
          ],
          -4,
          {
            allied: true,
            opponent: true,
          },
        ),
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
        trigger: { id: 'onDestroy', opponent: true },
        actions: [{ id: 'addPower', self: true, amount: +1 }],
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
        trigger: { id: 'onDestroy', opponent: true },
        actions: [{ id: 'addPower', self: true, amount: +2 }],
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
        CardEffect.addPower(
          [
            { dx: 0, dy: 2 },
            { dx: 1, dy: 2 },
            { dx: 0, dy: -2 },
            { dx: 1, dy: -2 },
          ],
          -1,
          {
            allied: true,
            opponent: true,
          },
        ),
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
        opponent: true,
        debuffed: true,
      }),
    ],
    description: `Raise power by 2 for each enfeebled enemy card.`,
  };

  // To be continued...
  // left off at `Chimera`
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
];
