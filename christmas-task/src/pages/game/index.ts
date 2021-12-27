import Component from '../../core/templates/component';
import GameSections from '../../core/templates/game';
import Page from '../../core/templates/page';
import * as interfaces from '../../core/interfaces';
import { data } from '../../assets/data';
import { Settings, localStorageNames } from '../../app/settings';
import Utils from '../../app/utils';

//TODO
/**
 *
 * 27.12 Mon
 *
 *  - get HTML lists of divs - snap shots..
 *  if has tag startedDecorating > restore tree
 *  - Update basket on all routs (main page! hide?)
 *  - Game senter append empty div after
 *
 *
 *  Styles
 *    - tree bg btn
 *    - tree lights bg
 *    - audio btn & snow
 *    - + colored snow?
 *    -
 *
 *
 **/

class GamePage extends Page {
  static gameOnSettings: interfaces.IGameOnSettingsExt;
  static basketItems: interfaces.basket;
  private static isRestoredLSData: boolean = false;

  private static snowInterval: ReturnType<typeof setInterval>;

  private leftSection: HTMLElement;
  private centerSection: HTMLElement;
  private rightSection: HTMLElement;
  private gameSections: GameSections;
  private audioBg: HTMLAudioElement;

  constructor(id: string, className: string) {
    super(id, className);
    this.leftSection = new Component(
      'section',
      'game-main__left section'
    ).render();
    this.centerSection = new Component(
      'section',
      'game-main__center section'
    ).render();
    this.rightSection = new Component(
      'section',
      'game-main__right section'
    ).render();
    this.gameSections = new GameSections();
    this.audioBg = new Audio();
  }

  createLeftSection() {
    const bgSettingsDiv = this.gameSections.leftBgSettings(
      new Component('div', 'game-main__left__bg-settings bg-settings').render()
    );

    bgSettingsDiv.addEventListener('click', (e: Event) => {
      this.handleBgSettings(e);
    });
    const chooseTreeDiv = this.gameSections.leftChooseTree(
      new Component('div', 'game-main__left__choose-tree choose-tree').render()
    );

    chooseTreeDiv.addEventListener('click', (e: Event) => {
      this.handleChooseTree(e);
    });

    // get all tree divs
    Array.from(chooseTreeDiv.children[1].children).forEach((div) => {
      div.setAttribute(
        'style',
        `background: rgba(173 216 230 / 23%) url("../assets/tree/${div.id.match(
          /\d+/g
        )}.png") no-repeat center; background-size: contain;`
      );
    });

    const chooseBgImg = this.gameSections.leftChooseTreeBG(
      new Component('div', 'game-main__left__choose-bg choose-bg').render()
    );
    chooseBgImg.addEventListener('click', (e: Event) => {
      this.handlechooseBgImg(e);
    });

    Array.from(chooseBgImg.children).forEach((bg) => {
      // console.log(`bg`, bg);
      if (bg.className === 'choose-bg') {
        Array.from(bg.children).forEach((bgDiv, idx) => {
          bgDiv.setAttribute(
            'style',
            `background-image: url('./assets/bg/${
              idx + 1
            }.jpg'); background-size: cover;`
          );
        });
      }
    });

    const chooseLights = this.gameSections.leftChooseLights(
      new Component(
        'div',
        'game-main__left__choose-lights choose-lights'
      ).render()
    );

    chooseLights.addEventListener('click', (e: Event) => {
      this.handlechooseLights(e);
    });

    this.leftSection.append(
      bgSettingsDiv,
      chooseTreeDiv,
      chooseBgImg,
      chooseLights
    );

    this.container.append(this.leftSection);
  }

  handleBgSettings(e: Event) {
    // console.log(`e`, e.target);
    const button = <HTMLElement>e.target;
    if (button.id === 'bg-settings-audio') {
      if (!GamePage.gameOnSettings.bg.audio) {
        this.audioBg.src = './assets/audio/audio.mp3';
        this.audioBg.volume = 0.5;
        GamePage.gameOnSettings.bg.audio = true;
        this.audioBg.play();
        // button.style.border = 'saturate(1.5) brightness(0.8)';
        button.classList.add('active');
      } else {
        GamePage.gameOnSettings.bg.audio = false;
        this.audioBg.pause();
        // button.style.filter = 'none';
        button.classList.remove('active');
      }
    } else if (button.id === 'bg-settings-snow') {
      if (GamePage.isRestoredLSData) {
        console.log(`handleBgSettings() > turn on snow is restored`);
        GamePage.snowInterval = setInterval(() => {
          this.createSnow();
          GamePage.gameOnSettings.bg.snow = true;
        }, 100);
        button.classList.add('active');
        GamePage.isRestoredLSData = false;
      } else {
        if (!GamePage.gameOnSettings.bg.snow) {
          GamePage.snowInterval = setInterval(() => {
            this.createSnow();
            GamePage.gameOnSettings.bg.snow = true;
          }, 100);
          button.classList.add('active');
        } else {
          clearInterval(GamePage.snowInterval);
          GamePage.gameOnSettings.bg.snow = false;
          button.classList.remove('active');
        }
      }
    }
    //TODO: remove set interval inside itself without external static method
    /**
     *
     * const snowflakesIntervalId = setInterval(() => {
          if (controlBtnSnowflake.classList.contains('active')) { 
          this.createSnowflake()
          } else {
            clearInterval(snowflakesIntervalId);
          }
        }, 
     *
     **/
  }

  handleChooseTree(e: Event) {
    // console.log(`e`, e.target);
    const button = <HTMLElement>e.target;
    if (button.id.split('-')[0] === 'choose') {
      const imgNum: string = String(button.id.match(/\d+/g));
      const centerDivTree = <HTMLElement>(
        this.container.querySelector('.game-main__center__tree')
      );
      centerDivTree.style.setProperty(
        '--game-center-tree',
        `url("../assets/tree/${imgNum}.png")`
      );
      // reset all other settings
      for (const [key, val] of Object.entries(GamePage.gameOnSettings.tree)) {
        GamePage.gameOnSettings.tree[key] = false;
      }
      GamePage.gameOnSettings.tree[`tree_${imgNum}`] = true;
      GamePage.isRestoredLSData = false;
    }
  }

  handlechooseBgImg(e: Event) {
    // console.log(`e`, e.target);
    const button = <HTMLElement>e.target;
    if (button.id.split('-')[0] === 'choose') {
      const imgNum: string = String(button.id.match(/\d+/g));
      const centerDivBg = <HTMLElement>(
        this.container.querySelector('.game-main__center__bg')
      );
      centerDivBg.style.setProperty(
        '--game-center-bg',
        `url("../assets/bg/${button.id.match(/\d+/g)}.jpg")`
      );
      // reset all other settings
      for (const [key, val] of Object.entries(GamePage.gameOnSettings.bgImg)) {
        GamePage.gameOnSettings.bgImg[key] = false;
      }
      GamePage.gameOnSettings.bgImg[`bgImg_${imgNum}`] = true;
      GamePage.isRestoredLSData = false;
    }
  }

  handlechooseLights(e: Event) {
    const button = <HTMLElement>e.target;

    const checkLightsContainer = (): HTMLElement => {
      if (
        !this.centerSection.querySelector(
          '.game-main__center__light-bulbs__container'
        )
      ) {
        return this.createTreeLights();
      } else {
        return this.centerSection.querySelector(
          '.game-main__center__light-bulbs__container'
        )!;
      }
    };

    // resetAll other lights
    const resetOtherLights = () => {
      // reset all other settings
      for (const [key, val] of Object.entries(
        GamePage.gameOnSettings.treeLights
      )) {
        key !== 'on' ? (GamePage.gameOnSettings.treeLights[key] = false) : null;
      }
    };

    if (button.id === 'choose-lights-checkbox') {
      if (GamePage.isRestoredLSData) {
        checkLightsContainer();
        GamePage.gameOnSettings.treeLights.on = true;
        (<HTMLInputElement>button).checked = true;
        GamePage.isRestoredLSData = false;
      } else {
        if (!GamePage.gameOnSettings.treeLights.on) {
          checkLightsContainer();
          GamePage.gameOnSettings.treeLights.on = true;
          (<HTMLInputElement>button).checked = true;
        } else {
          // console.log(`else remove`);
          checkLightsContainer().remove();
          GamePage.gameOnSettings.treeLights.on = false;
          (<HTMLInputElement>button).checked = false;
        }
      }
    } else if (
      button.id === 'choose-lights-1' &&
      GamePage.gameOnSettings.treeLights.on
    ) {
      checkLightsContainer().remove();
      resetOtherLights();
      if (!GamePage.gameOnSettings.treeLights.colored_1) {
        //if off > turn on lights
        checkLightsContainer();
        Array.from(checkLightsContainer().children).forEach((el) => {
          el.classList.add('on');
        });
        resetOtherLights();
        GamePage.gameOnSettings.treeLights.colored_1 = true;
      } else {
        checkLightsContainer();
        Array.from(checkLightsContainer().children).forEach((el) => {
          el.classList.remove('on');
        });
        GamePage.gameOnSettings.treeLights.colored_1 = false;
      }
    } else if (
      button.id === 'choose-lights-2' &&
      GamePage.gameOnSettings.treeLights.on
    ) {
      checkLightsContainer().remove();
      resetOtherLights();
      if (!GamePage.gameOnSettings.treeLights.blue_2) {
        GamePage.gameOnSettings.treeLights.blue_2 = true;
        // change bulb colors individually
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.add('on');
          // console.log(`el.children`, lightsLevel.children);
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-one);
            animation-name: light-up-theme-color-one;
            `
            );
          });
        });
      } else {
        checkLightsContainer().remove();
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.remove('on');
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-one);
            animation-name: none;
            `
            );
          });
        });
        GamePage.gameOnSettings.treeLights.blue_2 = false;
      }
    } else if (
      button.id === 'choose-lights-3' &&
      GamePage.gameOnSettings.treeLights.on
    ) {
      checkLightsContainer().remove();
      resetOtherLights();
      resetOtherLights();
      if (!GamePage.gameOnSettings.treeLights.green_3) {
        GamePage.gameOnSettings.treeLights.green_3 = true;
        // change bulb colors individually
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.add('on');
          // console.log(`el.children`, lightsLevel.children);
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-two);
            animation-name: light-up-theme-color-two;
            `
            );
          });
        });
      } else {
        // console.log(`else!`);
        checkLightsContainer().remove();
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.remove('on');
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-two);
            animation-name: none;
            `
            );
          });
        });
        GamePage.gameOnSettings.treeLights.green_3 = false;
      }
    } else if (
      button.id === 'choose-lights-4' &&
      GamePage.gameOnSettings.treeLights.on
    ) {
      checkLightsContainer().remove();
      resetOtherLights();
      if (!GamePage.gameOnSettings.treeLights.yellow_4) {
        GamePage.gameOnSettings.treeLights.yellow_4 = true;
        // change bulb colors individually
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.add('on');
          // console.log(`el.children`, lightsLevel.children);
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-three);
            animation-name: light-up-theme-color-three;
            `
            );
          });
        });
      } else {
        // console.log(`else!`);
        checkLightsContainer().remove();
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.remove('on');
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-three);
            animation-name: none;
            `
            );
          });
        });
        GamePage.gameOnSettings.treeLights.yellow_4 = false;
      }
    } else if (
      button.id === 'choose-lights-5' &&
      GamePage.gameOnSettings.treeLights.on
    ) {
      if (!GamePage.gameOnSettings.treeLights.red_5) {
        checkLightsContainer().remove();
        resetOtherLights();
        GamePage.gameOnSettings.treeLights.red_5 = true;
        // change bulb colors individually
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.add('on');
          // console.log(`el.children`, lightsLevel.children);
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-four);
            animation-name: light-up-theme-color-four;
            `
            );
          });
        });
      } else {
        checkLightsContainer().remove();
        Array.from(checkLightsContainer().children).forEach((lightsLevel) => {
          lightsLevel.classList.remove('on');
          Array.from(lightsLevel.children).forEach((bulb) => {
            bulb.setAttribute(
              'style',
              `
            background: var(--theme-color-four);
            animation-name: none;
            `
            );
          });
        });
        resetOtherLights();
        GamePage.gameOnSettings.treeLights.red_5 = false;
      }
    }
    // console.log(`GamePage.gameOnSettings`, GamePage.gameOnSettings);
  }

  createCenterSection() {
    // game-main__center__container

    const centerBg = <HTMLElement>(
      new Component('div', 'game-main__center__bg').render()
    );

    const centerTree = <HTMLElement>(
      new Component('div', 'game-main__center__tree').render()
    );

    const dragNDropArea = <HTMLElement>(
      new Component('div', 'game-main__center__dragNdrop-area').render()
    );

    const eventListeners: Array<string> = [
      'dragover',
      'dragenter',
      'dragleave',
      'drop',
    ];

    eventListeners.forEach((event) => {
      dragNDropArea.addEventListener(event, (e: Event) => {
        if (event === 'dragover') this.handleDragover(e);
        if (event === 'dragenter') this.handleDragenter(e);
        if (event === 'dragleave') this.handleDragleave(e);
        if (event === 'drop') this.handleDrop(e);
      });
    });

    centerBg.append(centerTree);
    centerBg.append(dragNDropArea);

    this.centerSection.append(centerBg);

    this.container.append(this.centerSection);
  }

  handleDrop(e: Event) {
    // console.log(`handledrop`, e);
    // console.log(`e.Dragdrop`, (<DragEvent>e).offsetX, (<DragEvent>e).offsetY);

    // console.log(`handleDrop() e.target`, e.target);

    if (
      (<HTMLElement>e.target).className === 'game-main__center__dragNdrop-area'
    ) {
      (<HTMLElement>GamePage.toyElement).setAttribute(
        'style',
        `top: ${(<DragEvent>e).offsetY - 50}px; left: ${
          (<DragEvent>e).offsetX - 50
        }px`
      );
      (<HTMLElement>e.target).append(<HTMLElement>GamePage.toyElement);
    }
  }

  handleDragleave(e: Event) {
    console.log(`handleDragleave`);
  }
  handleDragenter(e: Event) {
    // console.log(`handleDragenter`, e);
    e.preventDefault();
    // console.log(`e.offset X Y`, (<DragEvent>e).offsetX, (<DragEvent>e).offsetY);
  }

  handleDragover(e: Event) {
    console.log(`handleDragover`);
    e.preventDefault();
  }

  createTreeLights(): HTMLElement {
    const centerBg = <HTMLElement>this.centerSection.firstElementChild;
    const lightBulbs = this.gameSections.centerTreeLights(
      new Component('div', 'game-main__center__light-bulbs__container').render()
    );
    centerBg.append(lightBulbs);
    return lightBulbs;
  }

  createSnow() {
    //TODO: colored snow
    /**
     * add colored snow
     * https://reactgo.com/css-snow-animation/
     *
     **/
    const bg = this.centerSection.firstElementChild as HTMLElement;
    // console.log(`bg`, bg);
    const snowflake = <HTMLElement>(
      new Component('i', 'fa fa-snowflake-o flake').render()
    );

    snowflake.style.left =
      Math.random() * bg.getBoundingClientRect().width + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random() + '';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

    this.centerSection.firstElementChild?.prepend(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 3000);
  }

  createRightSection() {
    const cardContainer = <HTMLElement>(
      new Component('div', 'game-main__right__toys toys').render()
    );
    const containerHeading = <HTMLElement>(
      new Component('h2', 'heading heading__h2').render()
    );
    containerHeading.innerHTML = 'Игрушки';
    const toyCards = <HTMLElement>new Component('div', 'toys__cards').render();

    let dataImport: Array<interfaces.IData> = data.slice();

    // console.log(`here!`, GamePage.basketItems.items);

    GamePage.basketItems.items.forEach((item, idx) => {
      if (item) {
        const toyCard = <HTMLElement>new Component('div', 'toy__card').render();

        for (let i = 0; i < item; i++) {
          const toyImg = <HTMLElement>(
            new Component('img', 'toy__card__img').render()
          );
          toyImg.setAttribute('src', `./assets/toys/${idx}.png`);
          toyImg.setAttribute('alt', `toy`);
          toyImg.setAttribute('draggable', `true`);
          toyImg.addEventListener('dragstart', (e: Event) => {
            this.handleToyDragStart(e);
            // console.log(
            //   `parentElement`,
            //   (<HTMLElement>e.target).parentElement?.lastElementChild?.innerHTML
            // );
            // this.handleToyCardBadge(e, <HTMLElement>e.target);

            GamePage.toyPromise = this.dragEndPromise().then(() => {
              return {
                eventDrag: e,
                HTMLEl: (<HTMLElement>e.target).parentElement!,
              };
            });
          });
          toyImg.addEventListener('dragend', (e: Event) => {
            console.log(`dragend`, e);
            GamePage.toyPromise.then(
              (value: { eventDrag: Event; HTMLEl: HTMLElement }) => {
                console.log(`value!`, value);
                const { eventDrag, HTMLEl } = value;
                this.handleToyCardBadge(eventDrag, HTMLEl);
              }
            );
            this.handleToyDragEnd(e);
          });
          toyCard.append(toyImg);
        }

        const qtyDiv = <HTMLElement>(
          new Component('div', 'toy__card__qty').render()
        );
        qtyDiv.innerHTML = String(item);
        toyCard.append(qtyDiv);
        toyCards.append(toyCard);
      }
    });

    cardContainer.append(containerHeading, toyCards);
    this.rightSection.append(cardContainer);
    this.container.append(this.rightSection);
  }

  static toyElement: HTMLElement | null = null;
  static toyPromise: Promise<{ eventDrag: Event; HTMLEl: HTMLElement }>;

  dragEndPromise() {
    return Promise.resolve();
  }

  handleToyCardBadge(e: Event, el: HTMLElement) {
    // console.log(`handleToyCardBadge() e `, e);
    const childrenNum = Number((<HTMLElement>el).children.length) - 1;
    const lastEl = <HTMLElement>el.lastElementChild;
    lastEl.innerHTML = String(childrenNum);
  }

  handleToyDragStart(e: Event) {
    // console.log(`handleToyDragStart() e.target`, e.target);
    GamePage.toyElement = <HTMLElement>e.target;
  }

  handleToyDragEnd(e: Event) {
    console.log(`end > e.target`, e.target);
    GamePage.toyElement = null;
  }

  private restoreBasketState(): void {
    //TODO move to utils
    /**
     * reused in settings index ts and here ....
     *
     **/
    // restore data from LS
    const basketNumBadge = <HTMLElement>(
      document.querySelector('.basket__badge')
    );
    if (Settings.getLocalStorageControls(localStorageNames.basket)) {
      GamePage.basketItems = Object(
        Settings.getLocalStorageControls(localStorageNames.basket)
      );
    } else {
      GamePage.basketItems = new Settings().defaultBasketItems;
    }
    basketNumBadge.innerHTML = String(
      Utils.arrayLength(GamePage.basketItems.items)
    );
  }

  private restoreGameOnSettings(): void {
    // restore data from LS

    if (Settings.getLocalStorageControls(localStorageNames.gameOnSettings)) {
      GamePage.gameOnSettings = Object(
        Settings.getLocalStorageControls(localStorageNames.gameOnSettings)
      );
    } else {
      GamePage.gameOnSettings = new Settings().gameOnSettings;
      console.log(`just created!`, GamePage.gameOnSettings);
    }

    const bgSettings = GamePage.gameOnSettings.bg;
    const treeSettings = GamePage.gameOnSettings.tree;
    const bgImgSettings = GamePage.gameOnSettings.bgImg;
    const treeLightsSettings = GamePage.gameOnSettings.treeLights;

    console.log(`treeLightsSettings just loaded!`, treeLightsSettings);

    // Snow & Music
    for (const [innerKey, innerVal] of Object.entries(bgSettings)) {
      if (innerVal === true) {
        let event: Event = new Event('click', { bubbles: true });
        const btnsBlock = <HTMLElement>(
          this.container.querySelector(`.bg-settings`)
        );
        console.log(`restoreGameOnSettings() btnsBLock`, btnsBlock);
        const btn = <HTMLElement>(
          btnsBlock.querySelector(`#bg-settings-${innerKey}`)
        );
        // SettingsPage.isRestoredLSData = true;
        console.log(`dispatch event`, innerKey, innerVal);
        GamePage.isRestoredLSData = true;
        btn.dispatchEvent(event);
      }
    }

    // tree

    for (const [innerKey, innerVal] of Object.entries(treeSettings)) {
      if (innerVal === true) {
        let event: Event = new Event('click', { bubbles: true });
        const btnsBlock = <HTMLElement>(
          this.container.querySelector(`.choose-tree`)
        );
        console.log(`restoreGameOnSettings() btnsBLock`, btnsBlock);
        const getNum: string = String(innerKey.match(/\d+/g));
        const btn = <HTMLElement>(
          btnsBlock.querySelector(`#choose-tree-${getNum}`)
        );
        // SettingsPage.isRestoredLSData = true;
        console.log(`dispatch event`, innerKey, innerVal);
        GamePage.isRestoredLSData = true;
        btn.dispatchEvent(event);
      }
    }

    // background Image
    for (const [innerKey, innerVal] of Object.entries(bgImgSettings)) {
      if (innerVal === true) {
        let event: Event = new Event('click', { bubbles: true });
        const btnsBlock = <HTMLElement>(
          this.container.querySelector(`.choose-bg`)
        );
        // console.log(`restoreGameOnSettings() btnsBLock`, btnsBlock);
        const getNum: string = String(innerKey.match(/\d+/g));
        const btn = <HTMLElement>(
          btnsBlock.querySelector(`#choose-bg-${getNum}`)
        );
        // console.log(`dispatch event`, innerKey, innerVal);
        GamePage.isRestoredLSData = true;
        btn.dispatchEvent(event);
      }
    }

    if (treeLightsSettings.on) {
      let event: Event = new Event('click', { bubbles: true });
      const btnsBlock = <HTMLElement>(
        this.container.querySelector(`.choose-lights`)
      );
      // console.log(`restoreGameOnSettings() btnsBLock`, btnsBlock);
      const btn = <HTMLElement>(
        btnsBlock.querySelector(`#choose-lights-checkbox`)
      );
      GamePage.isRestoredLSData = true;
      btn.dispatchEvent(event);
      console.log(`restoreBasketState() btn`, btn);
      // loop over next values
      for (const [innerKey, innerVal] of Object.entries(treeLightsSettings)) {
        if (innerKey !== 'on' && innerVal === true) {
          let event: Event = new Event('click', { bubbles: true });
          const btnsBlock = <HTMLElement>(
            this.container.querySelector(`.choose-lights`)
          );
          console.log(`restoreGameOnSettings() btnsBLock`, btnsBlock);
          const getNum: string = String(innerKey.match(/\d+/g));
          const btn = <HTMLElement>(
            btnsBlock.querySelector(`#choose-lights-${getNum}`)
          );
          console.log(`dispatch event`, innerKey, innerVal);
          GamePage.isRestoredLSData = true;
          btn.dispatchEvent(event);
        }
      }
    }
  }

  // choose bg

  private saveToLS(): void {
    new Utils().delayAction([
      () =>
        Settings.setLocalStorageControls(
          localStorageNames.gameOnSettings,
          GamePage.gameOnSettings
        ),
    ]);
  }

  render() {
    this.restoreBasketState();
    this.createLeftSection();
    this.createCenterSection();
    this.createRightSection();
    this.saveToLS();
    this.restoreGameOnSettings();
    return this.container;
  }
}

export default GamePage;
