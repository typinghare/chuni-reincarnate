"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AbstractDataLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameObjectFactory = exports.AbstractGameObjectContainer = exports.AbstractDataFetcher = exports.AbstractDataLoader = exports.AbstractDataContainer = void 0;
const link_oriented_1 = require("link-oriented");
const inversify_1 = require("inversify");
let AbstractDataContainer = class AbstractDataContainer {
};
AbstractDataContainer = __decorate([
    (0, inversify_1.injectable)()
], AbstractDataContainer);
exports.AbstractDataContainer = AbstractDataContainer;
let AbstractDataLoader = AbstractDataLoader_1 = class AbstractDataLoader {
    constructor() {
        this.progress = (0, link_oriented_1.$var)(0);
    }
    static parsePath(path) {
        return path.trim().split(AbstractDataLoader_1.PATH_SEPARATOR);
    }
};
AbstractDataLoader.PATH_SEPARATOR = '.';
AbstractDataLoader = AbstractDataLoader_1 = __decorate([
    (0, inversify_1.injectable)()
], AbstractDataLoader);
exports.AbstractDataLoader = AbstractDataLoader;
let AbstractDataFetcher = class AbstractDataFetcher {
};
AbstractDataFetcher = __decorate([
    (0, inversify_1.injectable)()
], AbstractDataFetcher);
exports.AbstractDataFetcher = AbstractDataFetcher;
let AbstractGameObjectContainer = class AbstractGameObjectContainer {
};
AbstractGameObjectContainer = __decorate([
    (0, inversify_1.injectable)()
], AbstractGameObjectContainer);
exports.AbstractGameObjectContainer = AbstractGameObjectContainer;
let AbstractGameObjectFactory = class AbstractGameObjectFactory {
};
AbstractGameObjectFactory = __decorate([
    (0, inversify_1.injectable)()
], AbstractGameObjectFactory);
exports.AbstractGameObjectFactory = AbstractGameObjectFactory;
//# sourceMappingURL=interface.js.map