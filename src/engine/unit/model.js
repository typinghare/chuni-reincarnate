"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
class Unit {
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
exports.Unit = Unit;
//# sourceMappingURL=model.js.map