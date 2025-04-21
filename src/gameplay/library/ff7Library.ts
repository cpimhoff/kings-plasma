import { CardDefinition, CardEffect } from '../state';

export namespace FF7Library {
  // An index of all cards in FF7: Rebirth is available at:
  // https://game8.co/games/Final-Fantasy-VII-Rebirth/archives/Queens-Blood
  // The below definitions are ordered according to how they appear at that link

  export const SecurityOfficer: CardDefinition = {
    name: 'Security Officer',
    playRequirement: 1,
    power: 1,
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
    name: 'Riot Trooper',
    playRequirement: 2,
    power: 3,
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
    name: 'Grenadier',
    playRequirement: 2,
    power: 1,
    effects: [CardEffect.onThisPlayed(CardEffect.addPower([{ dx: 2, dy: 0 }], -4, { opponent: true }))],
    description: `When played, lower the power of enemy cards on affected tiles by 4.`,
  };

  export const JUnitSweeper: CardDefinition = {
    name: 'J-Unit Sweeper',
    playRequirement: 2,
    power: 2,
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
    name: 'Queen Bee',
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]),
    ],
  };

  export const Toxirat: CardDefinition = {
    name: 'Toxirat',
    playRequirement: 2,
    power: 2,
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
    name: 'Levrikon',
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
  };

  export const GrasslandsWolf: CardDefinition = {
    name: 'Grasslands Wolf',
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
      ]),
    ],
  };

  export const Mu: CardDefinition = {
    name: 'Mu',
    playRequirement: 2,
    power: 1,
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
    name: 'Mandragora',
    playRequirement: 1,
    power: 1,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
      CardEffect.onThisPlayed(
        CardEffect.createCardForPlayer({
          name: 'Mandragora Minion',
          playRequirement: 1,
          power: 1,
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
    name: 'Elphadunk',
    playRequirement: 2,
    power: 4,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
      ]),
    ],
  };

  export const Cactuar: CardDefinition = {
    name: 'Cactuar',
    playRequirement: 1,
    power: 1,
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
    name: 'Crystalline Crab',
    playRequirement: 1,
    power: 1,
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
    name: 'Quetzalcoatl',
    playRequirement: 2,
    power: 3,
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
    name: 'Zu',
    playRequirement: 2,
    power: 2,
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
    name: 'Devil Rider',
    playRequirement: 2,
    power: 4,
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
    name: 'Screamer',
    playRequirement: 3,
    power: 1,
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
    name: 'Flan',
    playRequirement: 1,
    power: 2,
    effects: [
      CardEffect.onThisPlayedAddPips([
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ]),
    ],
  };

  export const Crawler: CardDefinition = {
    name: 'Crawler',
    playRequirement: 1,
    power: 2,
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
    name: 'Archdragon',
    playRequirement: 1,
    power: 3,
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
    name: 'Ogre',
    playRequirement: 2,
    power: 5,
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
    name: 'Deathwheel',
    playRequirement: 1,
    power: 1,
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
    name: 'Fleetwing',
    playRequirement: 1,
    power: 3,
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
    name: 'Zemzelett',
    playRequirement: 2,
    power: 1,
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
    name: 'Ignilisk',
    playRequirement: 1,
    power: 1,
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
    name: 'Capparwire',
    playRequirement: 1,
    power: 3,
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
    name: 'Mind Flayer',
    playRequirement: 2,
    power: 1,
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
    name: 'Scrutineye',
    playRequirement: 1,
    power: 1,
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
    name: 'Hell Rider II',
    playRequirement: 3,
    power: 5,
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
    name: 'Flametrooper',
    playRequirement: 1,
    power: 3,
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
    name: 'Spearhawk',
    playRequirement: 1,
    power: 1,
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
    name: 'Sea Devil',
    playRequirement: 3,
    power: 1,
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
    name: 'Shoalopod',
    playRequirement: 2,
    power: 1,
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
    name: 'Crown Lance',
    playRequirement: 2,
    power: 2,
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
    name: 'Tonberry King',
    playRequirement: 2,
    power: 1,
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
    name: 'Sandhog Pie',
    playRequirement: 1,
    power: 1,
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
    name: 'Bloatfloat',
    playRequirement: 1,
    power: 1,
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
    name: 'Bagnadrana',
    playRequirement: 3,
    power: 2,
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
    name: 'Cockatrice',
    playRequirement: 2,
    power: 3,
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
    name: 'Heatseeker',
    playRequirement: 1,
    power: 1,
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
          name: 'Heatseeker Minion',
          playRequirement: 1,
          power: 1,
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
    name: 'Bomb',
    playRequirement: 2,
    power: 2,
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
    name: 'Thug',
    playRequirement: 2,
    power: 4,
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
    name: 'Death Claw',
    playRequirement: 1,
    power: 2,
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
    name: 'Landworm',
    playRequirement: 3,
    power: 5,
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
    name: 'Sandspitter',
    playRequirement: 2,
    power: 3,
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
];
