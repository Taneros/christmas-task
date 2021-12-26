interface IData {
  [key: string]: string | boolean;
}

interface IDataExact extends IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

interface IDataKeys {}

interface IObj {
  [key: string]: { [key: string]: boolean | number };
}

enum EDataKeys {
  num = 'num',
  name = 'name',
  count = 'count',
  year = 'year',
  shape = 'shape',
  color = 'color',
  size = 'size',
  favorite = 'favorite',
}

interface basket {
  [key: string]: Array<number | null>;
}

export { IData, IDataExact, IObj, EDataKeys, basket };
