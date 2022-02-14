import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import { DataContainer, DataFetcher, DataLoader, GameObjectContainer, GameObjectFactory } from './data';

const container = new Container();
container.bind<DataContainer>(TYPES.DataContainer).to(DataContainer).inSingletonScope();
container.bind<DataLoader>(TYPES.DataLoader).to(DataLoader).inSingletonScope();
container.bind<DataFetcher>(TYPES.DataFetcher).to(DataFetcher).inSingletonScope();
container.bind<GameObjectContainer>(TYPES.GameObjectContainer).to(GameObjectContainer).inSingletonScope();
container.bind<GameObjectFactory>(TYPES.GameObjectFactory).to(GameObjectFactory).inSingletonScope();

export default container;