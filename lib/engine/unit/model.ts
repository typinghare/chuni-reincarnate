import { Var } from 'link-oriented';
import { Producible } from '../interface/common';


export class Unit implements Producible {
  public strength: Var<number>;
  public spellPower: Var<number>;
  public agility: Var<number>;
  public resistance: Var<number>;
  public fortune: Var<number>;

  public hitPoint: Var<number>;
  public attack: Var<number>;
  public manaPoint: Var<number>;
  public speed: Var<number>;
  public defense: Var<number>;
  public parry: Var<number>;

  make() {
    this.strength.link(this.attack, (strength) => +strength * 7);
    this.spellPower.link(this.manaPoint, (spellPower) => +spellPower * 7);
    this.agility.link(this.speed, (agility) => +agility * 6);
    this.resistance.link(this.defense, (resistance) => +resistance * 4);
    this.fortune.link(this.parry, (agility) => +agility * 5);

    this.strength.trigger();
    this.spellPower.trigger();
    this.agility.trigger();
    this.resistance.trigger();
    this.fortune.trigger();
  }
}