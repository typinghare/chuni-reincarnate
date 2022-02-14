import { Unit } from './unit';

export type ActedFunction = (unit: Unit) => void;

export class Effect {
  /**
   * Called when effect is acted upon a unit.
   */
  public mount: ActedFunction;

  /**
   * Called when effect is removed from a unit.
   */
  public unmount: ActedFunction;

  /**
   * Duration of the effect. [this.unmount] is called when duration ends.
   * If duration equals to 0, the effect will last till the end of combat.
   * If duration less than 0 (usually sets -1), the effect will immediately be removed.
   * unit: milliseconds.
   */
  public duration: number = 0;

  /**
   * Whether displayed in buff bar.
   */
  public displayed: boolean = false;
}

export interface EffectReceiver {
  /**
   * Effect sets.
   */
  effect: Set<Effect>;

  /**
   * Mounting an effect.
   * @param effect
   */
  mountEffect(effect: Effect): void;

  /**
   * Unmounting an effect.
   * @param effect
   */
  unmountEffect(effect: Effect): void;
}