import { Var } from 'link-oriented';
import { Effect, EffectReceiver } from './effect';
import { Producible, StringDict } from '../interface';
import container from '../inversify';
import TYPES from '../types';
import { DataFetcher } from '../data';


export class Unit implements Producible, EffectReceiver {
  public hitPoint: Var<number>;
  public healthRegeneration: Var<number>;
  public manaRegeneration: Var<number>;
  public attack: Var<number>;
  public manaPoint: Var<number>;
  public speed: Var<number>;
  public defense: Var<number>;
  public parry: Var<number>;

  public effect: Set<Effect>;

  make() {
  }

  public mountEffect(effect: Effect): void {
    effect.mount(this);
    const duration = effect.duration;

    if (duration >= 0) {
      this.effect.add(effect);
    }
    if (duration > 0) {
      setTimeout(() => {
        this.unmountEffect(effect);
      }, duration);
    }
  }

  public unmountEffect(effect: Effect): void {
    this.effect.delete(effect);
    effect.unmount(this);
  }
}

export class Hero extends Unit {
  // stats
  public strength: Var<number>;
  public spellPower: Var<number>;
  public agility: Var<number>;
  public resistance: Var<number>;
  public fortune: Var<number>;

  make() {
    super.make();
    const dataFetcher = container.get<DataFetcher>(TYPES.DataFetcher);
    const coefficient: StringDict = dataFetcher.fetchDict('unit.hero.attribute.coefficient');

    this.strength.link(this.attack, (strength) => +strength * +coefficient['attack']);
    this.spellPower.link(this.manaPoint, (spellPower) => +spellPower * +coefficient['manaPoint']);
    this.agility.link(this.speed, (agility) => +agility * +coefficient['speed']);
    this.resistance.link(this.defense, (resistance) => +resistance * +coefficient['defense']);
    this.fortune.link(this.parry, (agility) => +agility * +coefficient['parry']);

    this.strength.link(this.healthRegeneration, (strength) => +strength * +coefficient['healthRegeneration']);
    this.spellPower.link(this.manaRegeneration, (spellPower) => +spellPower * +coefficient['manaRegeneration']);

    this.strength.trigger();
    this.spellPower.trigger();
    this.agility.trigger();
    this.resistance.trigger();
    this.fortune.trigger();
  }
}