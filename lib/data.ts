import {
  AbstractDataContainer,
  AbstractDataFetcher,
  AbstractDataLoader,
  AbstractGameObjectContainer,
  AbstractGameObjectFactory,
  Blueprint,
  Class,
  DataMap,
  Scalar,
  StringDict
} from './interface';
import { inject, injectable } from 'inversify';
import TYPES from './types';
import axios from 'axios';
import { $var } from 'link-oriented';

@injectable()
export class DataContainer extends AbstractDataContainer {
  protected _data: DataMap = new Map<string, DataMap | Scalar>();

  get(path: string): DataMap | StringDict | Scalar {
    const list = DataLoader.parsePath(path);
    let data: DataMap | StringDict | Scalar = this._data;
    for (let next of list) {
      if (data instanceof Map && data.has(next)) {
        data = data.get(next);
      } else {
        return null;
      }
    }
    return data;
  }

  set(data: StringDict, path: string): void {
    const list = DataLoader.parsePath(path);
    const key = list.pop();
    let _data: DataMap | StringDict | Scalar = this._data;
    for (let next of list) {
      if (_data instanceof Map) {
        if (!_data.has(next)) _data.set(next, new Map());
        _data = _data.get(next);
      } else {
        return;
      }
    }
    if (_data instanceof Map) _data.set(key, data);
  }
}

@injectable()
export class DataLoader extends AbstractDataLoader {
  @inject<DataContainer>(TYPES.DataContainer)
  public dataContainer: DataContainer;

  public async load(urlList: Array<string>, path: string): Promise<boolean> {
    return false;
  }

  public async loadOne(url: string): Promise<boolean> {
    let content = '';
    try {
      const { data } = await axios.get(url);
      content = data;
    } catch (e) {
      return false;
    }

    this.parseContent(content);
    return true;
  }

  protected parseContent(content: string) {
    const lines = content.split('\n');
    let path: string = '';
    let dataStr: string = '';

    const parseDataStr = (dataStr: string, path: string) => {
      if (!path) return;
      const data: NodeJS.Dict<string> = {};
      for (let w of dataStr.split(',').map(w => w.trim())) {
        let s = w.split(':');
        if (s.length >= 2) data[s[0].trim()] = s[1].trim();
      }
      this.dataContainer.set(data, path);
    };

    for (let line of lines) {
      line = line.trim();
      if (line[0] == '@') {
        // deal with dataStr
        parseDataStr(dataStr, path);

        // reset values
        path = line.slice(1);
        dataStr = '';
      } else {
        dataStr += ',' + line;
      }
    }
    parseDataStr(dataStr, path);
  }
}

@injectable()
export class DataFetcher extends AbstractDataFetcher {
  @inject<DataContainer>(TYPES.DataContainer)
  public dataContainer: DataContainer;

  public fetch(path: string): DataMap | StringDict | Scalar {
    return this.dataContainer.get(path);
  }
}

@injectable()
export class GameObjectContainer extends AbstractGameObjectContainer {
  protected container: NodeJS.Dict<object> = {};
}

@injectable()
export class GameObjectFactory extends AbstractGameObjectFactory {
  protected _blueprintMap: Map<Class<any>, Blueprint> = new Map();

  @inject<DataContainer>(TYPES.GameObjectContainer)
  public gameObjectContainer: GameObjectContainer;

  @inject<DataFetcher>(TYPES.DataFetcher)
  public dataFetcher: DataFetcher;

  public produce(cls: Class<any>, path: string): object {
    // @ts-ignore
    const data: StringDict = this.dataFetcher.fetch(path);
    if (typeof data != 'object') return null;

    const blueprint = this._blueprintMap.get(cls);
    if (blueprint === undefined) return null;

    const obj = new cls();
    for (let key in data) {
      let fullKey = blueprint[key];
      if (!fullKey) continue;
      obj[fullKey] = $var(parseInt(data[key]));
    }

    obj.make();
    return obj;
  }

  public setBlueprint(cls: Class<any>, blueprint: Blueprint): void {
    this._blueprintMap.set(cls, blueprint);
  }
}

