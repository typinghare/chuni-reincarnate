import TYPES from './types';
import container from './inversify.config';
import { DataLoader, GameObjectFactory } from './data';
import { Unit } from './engine/unit/model';

const dataLoader = container.get<DataLoader>(TYPES.DataLoader);
const gameObjectFactory = container.get<GameObjectFactory>(TYPES.GameObjectFactory);

dataLoader.loadOne('http://127.0.0.1:3000/data/unit/hero').then(() => {
  gameObjectFactory.setBlueprint(Unit, {
    st: 'strength',
    sp: 'spellPower',
    ag: 'agility',
    re: 'resistance',
    fo: 'fortune',
    hp: 'hitPoint',
    at: 'attack',
    mp: 'manaPoint',
    sd: 'speed',
    de: 'defense',
    pa: 'parry'
  });
  const hero = gameObjectFactory.produce(Unit, 'unit.hero');
  console.log(hero);
});
