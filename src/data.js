"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectFactory = exports.GameObjectContainer = exports.DataFetcher = exports.DataLoader = exports.DataContainer = void 0;
const interface_1 = require("./interface");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const axios_1 = require("axios");
const link_oriented_1 = require("link-oriented");
let DataContainer = class DataContainer extends interface_1.AbstractDataContainer {
    constructor() {
        super(...arguments);
        this._data = new Map();
    }
    get(path) {
        const list = DataLoader.parsePath(path);
        let data = this._data;
        for (let next of list) {
            if (data instanceof Map && data.has(next)) {
                data = data.get(next);
            }
            else {
                return null;
            }
        }
        return data;
    }
    set(data, path) {
        const list = DataLoader.parsePath(path);
        const key = list.pop();
        let _data = this._data;
        for (let next of list) {
            if (_data instanceof Map) {
                if (!_data.has(next))
                    _data.set(next, new Map());
                _data = _data.get(next);
            }
            else {
                return;
            }
        }
        if (_data instanceof Map)
            _data.set(key, data);
    }
};
DataContainer = __decorate([
    (0, inversify_1.injectable)()
], DataContainer);
exports.DataContainer = DataContainer;
let DataLoader = class DataLoader extends interface_1.AbstractDataLoader {
    async load(urlList, path) {
        return false;
    }
    async loadOne(url) {
        let content = '';
        try {
            const { data } = await axios_1.default.get(url);
            content = data;
        }
        catch (e) {
            return false;
        }
        this.parseContent(content);
        return true;
    }
    parseContent(content) {
        const lines = content.split('\n');
        let path = '';
        let dataStr = '';
        const parseDataStr = (dataStr, path) => {
            if (!path)
                return;
            const data = {};
            for (let w of dataStr.split(',').map(w => w.trim())) {
                let s = w.split(':');
                if (s.length >= 2)
                    data[s[0].trim()] = s[1].trim();
            }
            this.dataContainer.set(data, path);
        };
        for (let line of lines) {
            line = line.trim();
            if (line[0] == '@') {
                parseDataStr(dataStr, path);
                path = line.slice(1);
                dataStr = '';
            }
            else {
                dataStr += ',' + line;
            }
        }
        parseDataStr(dataStr, path);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.default.DataContainer),
    __metadata("design:type", DataContainer)
], DataLoader.prototype, "dataContainer", void 0);
DataLoader = __decorate([
    (0, inversify_1.injectable)()
], DataLoader);
exports.DataLoader = DataLoader;
let DataFetcher = class DataFetcher extends interface_1.AbstractDataFetcher {
    fetch(path) {
        return this.dataContainer.get(path);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.default.DataContainer),
    __metadata("design:type", DataContainer)
], DataFetcher.prototype, "dataContainer", void 0);
DataFetcher = __decorate([
    (0, inversify_1.injectable)()
], DataFetcher);
exports.DataFetcher = DataFetcher;
let GameObjectContainer = class GameObjectContainer extends interface_1.AbstractGameObjectContainer {
    constructor() {
        super(...arguments);
        this.container = {};
    }
};
GameObjectContainer = __decorate([
    (0, inversify_1.injectable)()
], GameObjectContainer);
exports.GameObjectContainer = GameObjectContainer;
let GameObjectFactory = class GameObjectFactory extends interface_1.AbstractGameObjectFactory {
    constructor() {
        super(...arguments);
        this._blueprintMap = new Map();
    }
    produce(cls, path) {
        const data = this.dataFetcher.fetch(path);
        if (typeof data != 'object')
            return null;
        const blueprint = this._blueprintMap.get(cls);
        if (blueprint === undefined)
            return null;
        const obj = new cls();
        for (let key in data) {
            let fullKey = blueprint[key];
            if (!fullKey)
                continue;
            obj[fullKey] = (0, link_oriented_1.$var)(parseInt(data[key]));
        }
        obj.make();
        return obj;
    }
    setBlueprint(cls, blueprint) {
        this._blueprintMap.set(cls, blueprint);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.default.GameObjectContainer),
    __metadata("design:type", GameObjectContainer)
], GameObjectFactory.prototype, "gameObjectContainer", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.default.DataFetcher),
    __metadata("design:type", DataFetcher)
], GameObjectFactory.prototype, "dataFetcher", void 0);
GameObjectFactory = __decorate([
    (0, inversify_1.injectable)()
], GameObjectFactory);
exports.GameObjectFactory = GameObjectFactory;
//# sourceMappingURL=data.js.map