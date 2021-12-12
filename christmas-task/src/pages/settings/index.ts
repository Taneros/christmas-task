import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';

// interface IData {
//   num: string;
//   name: string;
//   count: string;
//   year: string;
//   shape: string;
//   color: string;
//   size: string;
//   favorite: boolean;
// }

interface IData {
  [key: string]: string | boolean;
}

// interface filter {
//   count: {};
//   year: {};
//   shape: { [key: string]: boolean };
//   color: {};
//   size: {};
//   favorite: boolean;
// }

interface IObj {
  [key: string]: { [key: string]: boolean | number } | boolean;
}

// export interface testPropObj {
//   [key2: string]: boolean | number;
// }

// export interface testMainObj {
//   [key1: string]: testPropObj | boolean;
// }

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  createContentControls(): void {
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;
    this.container.append(controlSection);
    const cardsSection: HTMLElement = this.cardsSection.render();
    cardsSection.innerHTML = SettingsSections.cards;
    this.container.append(cardsSection);
    this.bindListeners();
  }

  translateProp(prop: string, lang: string): string {
    let translation: string = '';

    const rusLabel = [
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
    const engLabel = [
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

    if (lang === 'en') {
      translation = engLabel[rusLabel.indexOf(prop)];
    } else {
      translation = rusLabel[engLabel.indexOf(prop)];
    }
    return translation || prop;
  }

  bindListeners(): void {
    //TODO
    /**
     * Move filter and if conditions to separate method cllaed from bind listeners
     *
     **/

    const buttonBlocks = this.container.querySelectorAll('.filter__btns');
    const filter: IObj = {
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
      favorite: false,
    };

    buttonBlocks.forEach((btnBlock) => {
      btnBlock?.addEventListener('click', (e) => {
        const buttonDiv = e.currentTarget as HTMLElement;
        const button = e.target as HTMLInputElement;
        // console.log('button', button.checked);
        const dataFilterVal: string | undefined = button.dataset.filter;
        // console.log('dataFilterVal', dataFilterVal);
        if (dataFilterVal) {
          const btnDiv: string | undefined = buttonDiv.id
            .split('-')
            .slice(-1)[0];
          const btnData: string | undefined = this.translateProp(
            dataFilterVal,
            'en'
          );
          console.log('btnDiv, btnData', btnDiv, btnData);
          let levelOneProp = filter[btnDiv];
          console.log('levelOneProp', levelOneProp);
          // typeof levelOneProp === 'object'
          //   ? levelOneProp[btnData] === false
          //     ? (levelOneProp[btnData] = true)
          //     : (levelOneProp[btnData] = false)
          //   : levelOneProp === false
          //   ? (levelOneProp = true)
          //   : (levelOneProp = false);

          if (typeof levelOneProp === 'object') {
            if (levelOneProp[btnData] === false) {
              levelOneProp[btnData] = true;
            } else {
              levelOneProp[btnData] = false;
            }
          } else {
            console.log('button.checked', button.checked);
            if (levelOneProp === false) {
              console.log('before false');
              filter[btnDiv] = true;
            } else {
              console.log('before true');
              filter[btnDiv] = false;
              // button.checked === true
              //   ? (button.checked = false)
              //   : (button.checked = true);
            }
          }
        }
        console.log('filtered data:', this.fileterData(filter));
      });
    });
  }

  fileterData(filter: IObj) {
    console.log(`filter`, filter);

    const shape = typeof filter.shape === 'object' ? filter.shape : {};
    const color = typeof filter.color === 'object' ? filter.color : {};
    const size = typeof filter.size === 'object' ? filter.size : {};
    const favorite =
      typeof filter.favorite === 'boolean' ? filter.favorite : false;

    // console.log('shape', shape);

    const filteredData: Array<IData> = [];
    const dataImport: Array<IData> = data.slice();

    dataImport.forEach((el) => {
      // filter shape
      for (let key in shape) {
        // console.log(`key`, key);
        // console.log(`shape[key]`, shape[`${key}`]);
        // console.log(`el[key]`, el[`shape`]);
        // console.log(`translation`, key, this.translateProp(key, 'ru'));
        if (
          shape[`${key}`] === true &&
          el[`shape`] === this.translateProp(key, 'ru')
        ) {
          // console.log('match!');
          filteredData.push(el);
        }
      }
      // filter color
      for (let key in color) {
        if (
          color[key] === true &&
          el['color'] === this.translateProp(key, 'ru')
        ) {
          // console.log('match!');
          filteredData.push(el);
        }
      }
      // filter size
      for (let key in size) {
        if (
          size[key] === true &&
          el['size'] === this.translateProp(key, 'ru')
        ) {
          // console.log('match!');
          filteredData.push(el);
        }
      }
      // filter favourite
      if (favorite && el['favorite'] === true) {
        // console.log('match!');
        filteredData.push(el);
      }
    });
    return this.checkUnique(filteredData);
  }

  checkUnique(a: Array<IData>) {
    let uniqueSet = new Set();
    a.forEach((el) => uniqueSet.add(el));
    // b.forEach((el) => uniqueSet.add(el));
    // uniqueSet.add(b)
    const uniqueArr = Array.from(uniqueSet);
    return uniqueArr;
  }

  render() {
    this.createContentControls();
    return this.container;
  }
}

export default SettingsPage;
