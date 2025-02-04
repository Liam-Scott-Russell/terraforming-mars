import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {MoonSpaces} from '../../moon/MoonSpaces';
import {MoonExpansion} from '../../moon/MoonExpansion';
import {TileType} from '../../../common/TileType';
import {Card} from '../Card';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';

export class MareNubiumMine extends Card {
  constructor() {
    super({
      name: CardName.MARE_NUBIUM_MINE,
      cardType: CardType.AUTOMATED,
      tags: [Tag.MOON, Tag.BUILDING],
      cost: 17,

      behavior: {
        production: {titanium: 1},
      },
      reserveUnits: {titanium: 1},
      tr: {moonMining: 1},

      metadata: {
        description: 'Spend 1 titanium. Increase your titanium production 1 step. Place a mine ON THE RESERVED AREA and raise the Mining Rate 1 step.',
        cardNumber: 'M02',
        renderData: CardRenderer.builder((b) => {
          b.minus().titanium(1);
          b.production((pb) => pb.titanium(1)).moonMine({secondaryTag: AltSecondaryTag.MOON_MINING_RATE}).asterix();
        }),
      },
      tilesBuilt: [TileType.MOON_MINE],
    });
  }

  public override bespokePlay(player: Player) {
    MoonExpansion.addMineTile(player, MoonSpaces.MARE_NUBIUM, this.name);
    MoonExpansion.raiseMiningRate(player);
    return undefined;
  }
}
