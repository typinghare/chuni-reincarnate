import { inject, injectable } from 'inversify';
import { DataLoader, GameObjectFactory } from '../data';
import TYPES from '../types';
import blueprintMap from './blueprint';
import { Hero, Unit } from './unit';
import { Links } from 'link-oriented';

@injectable()
export class Game {
  @inject<DataLoader>(TYPES.DataLoader)
  public dataLoader: DataLoader;

  @inject<GameObjectFactory>(TYPES.GameObjectFactory)
  public gameObjectFactory: GameObjectFactory;

  public async start() {
    blueprintMap.forEach((blueprint, unit) => {
      this.gameObjectFactory.setBlueprint(unit, blueprint);
    });

    await this.dataLoader.load(['data/unit/hero', 'data/unit/enemy']);
    const hero: Unit = this.gameObjectFactory.produce(Hero, 'unit.hero.init.human');

    await this.dataLoader.load(['data/unit/hero', 'data/unit/enemy']);
    const spider = this.gameObjectFactory.produce(Unit, 'unit.enemy.spider');
    console.log(spider);

    // combat (hero vs. spider)
    Links.log(hero.hitPoint, 'hero HP');
    Links.log(spider.hitPoint, 'spider HP');

    const heroHandle = setInterval(() => {
      const damage = Math.ceil(+hero.attack * (100 - +spider.defense) / 100);
      spider.hitPoint.assign(+spider.hitPoint - damage);
    }, 30000 / +hero.speed);

    const spiderHandle = setInterval(() => {
      const damage = Math.ceil(+spider.attack * (100 - +hero.defense) / 100);
      hero.hitPoint.assign(+hero.hitPoint - damage);
    }, 30000 / +spider.speed);

    Links.trigger(spider.hitPoint, (hp) => {
      console.log(`spider HP: ${hp.val}`);
      if (+hp < 0) {
        clearInterval(heroHandle);
        clearInterval(spiderHandle);
      }
    });
  }
}