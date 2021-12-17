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

interface IObj {
  [key: string]: { [key: string]: boolean | number };
}

export { IData, IDataExact, IObj };
