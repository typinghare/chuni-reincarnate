"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const inversify_config_1 = require("./inversify.config");
const model_1 = require("./engine/unit/model");
const dataLoader = inversify_config_1.default.get(types_1.default.DataLoader);
const gameObjectFactory = inversify_config_1.default.get(types_1.default.GameObjectFactory);
dataLoader.loadOne('http://127.0.0.1:3000/data/unit/hero').then(() => {
    gameObjectFactory.setBlueprint(model_1.Unit, {
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
    const hero = gameObjectFactory.produce(model_1.Unit, 'unit.hero');
    console.log(hero);
});
//# sourceMappingURL=index.js.map