//TODO
/**
 * move settings here
 *
 * store control settings here
 *
 * untilities ts
 *
 *   can store and retreve from local storage
 *
 *
 *
 **/

import * as interfaces from '../core/interfaces';

const enum localStorageNames {
  filter = 'filter',
  basket = 'basket',
  gameOnSettings = 'gameOnSettings',
  hash = 'hash',
}

class Settings {
  gameOnSettings: interfaces.IGameOnSettingsExt = {
    startDecorate: { start: false },

    bg: {
      snow: false,
      audio: false,
    },

    tree: {
      tree_1: false,
      tree_2: false,
      tree_3: false,
      tree_4: false,
    },

    bgImg: {
      bgImg_1: false,
      bgImg_2: false,
      bgImg_3: false,
      bgImg_4: false,
      bgImg_5: false,
      bgImg_6: false,
      bgImg_7: false,
      bgImg_8: false,
    },

    treeLights: {
      on: false,
      colored_1: false,
      blue_2: false,
      green_3: false,
      yellow_4: false,
      red_5: false,
    },
  };

  static sliderYearSettings = {
    start: [1940, 2020],
    connect: true,
    range: {
      min: 1940,
      max: 2020,
    },
    step: 10,
  };

  static sliderQtySettings = {
    start: [1, 12],
    connect: true,
    range: {
      min: 1,
      max: 12,
    },
    step: 1,
  };

  defaultBasketItems: interfaces.basket = {
    items: [
      null,
      2,
      5,
      3,
      2,
      4,
      6,
      12,
      10,
      2,
      7,
      11,
      5,
      3,
      4,
      3,
      3,
      7,
      2,
      12,
      8,
    ],
  };

  filter: interfaces.IObj = {
    count: { start: 1, end: 12 },
    year: { start: 1940, end: 2020 },
    shape: {
      ball: false,
      bell: false,
      pinecone: false,
      snowflake: false,
      figurine: false,
    },
    color: {
      white: false,
      yellow: false,
      red: false,
      blue: false,
      green: false,
    },
    size: {
      big: false,
      medium: false,
      small: false,
    },
    favorite: { favorite: false },
    select: {
      AZ: false,
      ZA: false,
      qtyUp: false,
      qtyDown: false,
      yearUp: false,
      yearDown: false,
    },
    isChanged: { isChanged: false },
  };

  //TODO
  /**
   * add array type Array<type of boolean | number> to basketItems
   **/

  basketItems: interfaces.basket = {
    items: [],
  };

  static basketMaxToys: number = 20;

  static setLocalStorageControls(
    data_name: localStorageNames,
    data: object | [] | string
  ): void {
    localStorage.setItem(data_name, JSON.stringify(data));
  }

  static getLocalStorageControls(data: localStorageNames): string | boolean {
    if (localStorage.getItem(data)) {
      return JSON.parse(String(localStorage.getItem(data)));
    }
    return false;
  }
}

export { Settings, localStorageNames };
