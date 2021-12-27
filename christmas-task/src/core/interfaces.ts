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

interface IGameOnSettingsExt extends IGameOnSettings {
  startDecorate: boolean;
  bg: {
    snow: boolean;
    audio: boolean;
  };
  tree: {
    tree_1: boolean;
    tree_2: boolean;
    tree_3: boolean;
    tree_4: boolean;
  };
  bgImg: {
    bgImg_1: boolean;
    bgImg_2: boolean;
    bgImg_3: boolean;
    bgImg_4: boolean;
    bgImg_5: boolean;
    bgImg_6: boolean;
    bgImg_7: boolean;
    bgImg_8: boolean;
  };
  treeLights: {
    on: boolean;
    colored: boolean;
    blue: boolean;
    green: boolean;
    yellow: boolean;
    red: boolean;
  };
}

interface IGameOnSettings {
  [key: string]: boolean | { [key: string]: boolean };
}

export { IData, IDataExact, IObj, EDataKeys, basket, IGameOnSettingsExt };
