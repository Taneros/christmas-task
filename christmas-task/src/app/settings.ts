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

class Settings {
  static sliderYearSettings = {
    start: [1960, 2020],
    connect: true,
    range: {
      min: 1960,
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

  static filter: interfaces.IObj = {
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
    select: { AZ: true, ZA: false, qtyUp: false, qtyDown: false },
    isChanged: { isChanged: false },
  };

  static basketMaxToys: number = 20;
}

export default Settings;
