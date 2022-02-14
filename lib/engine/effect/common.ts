import { ActedFunction, Effect } from '../effect';
import { Unit } from '../unit';
import { $var, Links, Var } from 'link-oriented';

export function effect(
  mount: ActedFunction,
  unmount: ActedFunction,
  duration: number = 0,
  displayed: boolean = false
): Effect {
  const _effect = new Effect();
  _effect.mount = mount;
  _effect.unmount = unmount;
  _effect.duration = duration;
  _effect.displayed = displayed;
  return _effect;
}

export function instant(mount: ActedFunction): Effect {
  return effect(mount, null, -1);
}

export function permanent(mount: ActedFunction, unmount: ActedFunction = null, displayed: boolean = false): Effect {
  return effect(mount, unmount, 0, displayed);
}

export function overTime(mount: ActedFunction, unmount: ActedFunction, duration: number, displayed: boolean = false): Effect {
  return effect(mount, unmount, duration, displayed);
}

export function statPermanent(name: string, value: number, isReturn: true, displayed: boolean = false) {
  return permanent(function(unit: Unit) {
    const _var: Var<number> = Object.getOwnPropertyDescriptors(unit)[name].value;
    _var.assign(+_var + value);
  }, isReturn ? function(unit: Unit) {
    const _var: Var<number> = Object.getOwnPropertyDescriptors(unit)[name].value;
    _var.assign(+_var - value);
  } : null, displayed);
}

export function statTemporary(name: string, value: number) {
  return;
}

export function statInstant(name: string, value: number) {
  return instant(function(unit: Unit): void {
    const _var: Var<number> = Object.getOwnPropertyDescriptors(unit)[name].value;
    _var.assign(+_var + value);
  });
}

export function statOverTime(
  name: string,
  value: number,
  interval: number,
  duration: number,
  displayed: boolean = true
) {
  const timer = $var<NodeJS.Timer>();
  Links.trigger(timer, (timer) => {
    if (timer.val !== null) clearInterval(timer.val);
  });

  return overTime(function(unit: Unit): void {
    const _var: Var<number> = Object.getOwnPropertyDescriptors(unit)[name].value;
    const handle: NodeJS.Timer = setInterval(() => {
      _var.assign(+_var + value);
    }, interval);
    timer.assign(handle);
  }, function(): void {
    timer.trigger();
    timer.release();
  }, duration, displayed);
}