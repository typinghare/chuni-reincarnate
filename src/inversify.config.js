"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const data_1 = require("./data");
const container = new inversify_1.Container();
container.bind(types_1.default.DataContainer).to(data_1.DataContainer).inSingletonScope();
container.bind(types_1.default.DataLoader).to(data_1.DataLoader).inSingletonScope();
container.bind(types_1.default.DataFetcher).to(data_1.DataFetcher).inSingletonScope();
container.bind(types_1.default.GameObjectContainer).to(data_1.GameObjectContainer).inSingletonScope();
container.bind(types_1.default.GameObjectFactory).to(data_1.GameObjectFactory).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map