import { Hero, Unit } from './unit';
import { Class, StringDict } from '../interface';

const blueprintMap: Map<Class<any>, StringDict> = new Map();

const unitBlueprint = {
  hp: 'hitPoint',
  hr: 'healthRegeneration',
  mr: 'manaRegeneration',
  at: 'attack',
  mp: 'manaPoint',
  sd: 'speed',
  de: 'defense',
  pa: 'parry'
};
blueprintMap.set(Unit, unitBlueprint);

const heroBlueprint = Object.assign({ ...unitBlueprint }, {
  st: 'strength',
  sp: 'spellPower',
  ag: 'agility',
  re: 'resistance',
  fo: 'fortune'
});
blueprintMap.set(Hero, heroBlueprint);

export default blueprintMap;