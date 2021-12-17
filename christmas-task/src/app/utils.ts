import * as interfaces from '../core/interfaces';
import { data } from '../assets/data';

class Utils {
  static rusLabel = [
    'шар',
    'колокольчик',
    'шишка',
    'снежинка',
    'фигурка',
    'белый',
    'желтый',
    'красный',
    'синий',
    'зелёный',
    'большой',
    'средний',
    'малый',
  ];

  private static engLabel = [
    'ball',
    'bell',
    'pinecone',
    'snowflake',
    'figurine',
    'white',
    'yellow',
    'red',
    'blue',
    'green',
    'big',
    'medium',
    'small',
  ];

  static translateProp(prop: string, lang: string): string {
    let translation: string = '';

    if (lang === 'en') {
      translation = Utils.engLabel[Utils.rusLabel.indexOf(prop)];
    } else {
      translation = Utils.rusLabel[Utils.engLabel.indexOf(prop)];
    }
    return translation || prop;
  }

  static filterData(filter: interfaces.IObj) {
    // console.log(`filter`, filter.select);
    const qty = typeof filter.count === 'object' ? filter.count : {};
    const year = typeof filter.year === 'object' ? filter.year : {};
    const selectDropDown =
      typeof filter.select === 'object' ? filter.select : {};

    let dataImport: Array<interfaces.IData> = data.slice();

    for (const [key, value] of Object.entries(filter)) {
      let filteredData: Array<interfaces.IData> = [];
      for (const [innerKey, innerVal] of Object.entries(value)) {
        if (innerVal === true) {
          filteredData = filteredData.concat(
            dataImport.filter((toy) => {
              return (
                toy[`${key}`] ===
                (this.translateProp(innerKey, 'ru') === innerKey
                  ? innerVal
                  : this.translateProp(innerKey, 'ru'))
              );
            })
          );
        }
      }
      // filter by range qty
      dataImport = dataImport.filter((el, idx) => {
        for (let key in qty) {
          if (
            key === 'start' &&
            parseInt(el['count'] as string) >= <number>qty[key] &&
            parseInt(el['count'] as string) <= <number>qty['end']
          ) {
            return el;
          } else if (
            key === 'end' &&
            parseInt(el['count'] as string) >= <number>qty[key] &&
            parseInt(el['count'] as string) <= <number>qty['start']
          ) {
            return el;
          }
        }
      });

      // filter by range year
      dataImport = dataImport.filter((el, idx) => {
        for (let key in year) {
          if (
            key === 'start' &&
            parseInt(el['year'] as string) >= <number>year[key] &&
            parseInt(el['year'] as string) <= <number>year['end']
          ) {
            return el;
          } else if (
            key === 'end' &&
            parseInt(el['year'] as string) >= <number>year[key] &&
            parseInt(el['year'] as string) <= <number>year['start']
          ) {
            return el;
          }
        }
      });

      for (const [innerKey, innerVal] of Object.entries(selectDropDown)) {
        if (innerVal === true && innerKey === 'AZ') {
          // console.log(`innerKey innerVal >>>`, innerKey, innerVal);
          dataImport = dataImport.sort(function (
            a: interfaces.IData,
            b: interfaces.IData
          ): number {
            return String(a.name).charCodeAt(0) - String(b.name).charCodeAt(0);
          });
        } else if (innerVal === true && innerKey === 'ZA') {
          dataImport = dataImport.sort(function (
            a: interfaces.IData,
            b: interfaces.IData
          ): number {
            return String(b.name).charCodeAt(0) - String(a.name).charCodeAt(0);
          });
        } else if (innerVal === true && innerKey === 'qtyUp') {
          dataImport = dataImport.sort(function (
            a: interfaces.IData,
            b: interfaces.IData
          ): number {
            return Number(a.count) - Number(b.count);
          });
        } else if (innerVal === true && innerKey === 'qtyDown') {
          dataImport = dataImport.sort(function (
            a: interfaces.IData,
            b: interfaces.IData
          ): number {
            return Number(b.count) - Number(a.count);
          });
        }
      }

      // console.log(`filteredData.length`, filteredData.length);

      if (filteredData.length) {
        dataImport = dataImport.concat(filteredData);
        if (dataImport.length !== filteredData.length) {
          dataImport = dataImport.filter((el, idx) => {
            return dataImport.indexOf(el) !== idx;
          });
        }
      }
    }

    return dataImport;
  }

  static searchItems(input: string) {
    let dataImport: Array<interfaces.IData> = data.slice();

    const filteredData: Array<interfaces.IData> = [];
    dataImport.forEach((el) => {
      for (const [key, value] of Object.entries(el)) {
        if (key === 'name' && String(value).includes(input))
          filteredData.push(el);
      }
    });
    // console.log(`filteredData`, filteredData);

    if (filteredData.length) {
      dataImport = dataImport.concat(filteredData);
      if (dataImport.length !== filteredData.length) {
        dataImport = dataImport.filter((el, idx) => {
          return dataImport.indexOf(el) !== idx;
        });
      }
    }

    return dataImport;
  }
}

export default Utils;
