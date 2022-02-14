import { $var, Var } from 'link-oriented';
import { injectable } from 'inversify';
import { Producible } from './engine/interface/common';

export type Class<T extends Producible> = new (...args: any[]) => T;
export type Scalar = string | number | boolean | null;
export type StringDict = NodeJS.Dict<string>;
export type DataMap = Map<string, DataMap | StringDict | Scalar>;
export type Blueprint = NodeJS.ReadOnlyDict<string>;

@injectable()
export abstract class AbstractDataContainer {
  protected _data: DataMap;

  /**
   * Set data.
   * @param data
   * @param path
   */
  public abstract set(data: NodeJS.Dict<any>, path: string): void;

  /**
   * Get data from container.
   * @param path
   */
  public abstract get(path: string): DataMap | StringDict | Scalar;
}

@injectable()
export abstract class AbstractDataLoader {
  public static readonly PATH_SEPARATOR: string = '.';

  public readonly progress: Var<number> = $var(0);

  public dataContainer: AbstractDataContainer;

  public static parsePath(path: string): Array<string> {
    return path.trim().split(AbstractDataLoader.PATH_SEPARATOR);
  }

  public abstract load(urlList: Array<string>, path: string): Promise<boolean>;

  public abstract loadOne(url: string, path: string): Promise<boolean>;
}

@injectable()
export abstract class AbstractDataFetcher {
  public dataContainer: AbstractDataContainer;

  public abstract fetch(path: string): DataMap | StringDict | Scalar;
}

@injectable()
export abstract class AbstractGameObjectContainer {
  protected container: NodeJS.Dict<object>;
}

@injectable()
export abstract class AbstractGameObjectFactory {
  protected _blueprintMap: Map<Class<any>, Blueprint>;

  public gameObjectContainer: AbstractGameObjectContainer;

  public abstract setBlueprint(cls: Class<any>, blueprint: Blueprint): void;

  public abstract produce(cls: Class<any>, path: string): object;
}