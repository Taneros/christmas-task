import Component from '../../core/templates/component';
import GameSections from '../../core/templates/game';
import Page from '../../core/templates/page';

class GamePage extends Page {
  static gameOnSettings = {
    bg: {
      snow: false,
      audio: false,
      interval: null,
    },
    treeLights: {
      on: false,
      colored: false,
    },
  };

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
    const chooseBgImg = this.gameSections.leftChooseTreeBG(
      new Component('div', 'game-main__left__choose-bg choose-bg').render()
    );
    chooseBgImg.addEventListener('click', (e: Event) => {
      this.handlechooseBgImg(e);
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
      console.log(`turn on audio`);
      if (!GamePage.gameOnSettings.bg.audio) {
        this.audioBg.src = './assets/audio/audio.mp3';
        this.audioBg.volume = 0.5;
        GamePage.gameOnSettings.bg.audio = true;
        this.audioBg.play();
      } else {
        GamePage.gameOnSettings.bg.audio = false;
        this.audioBg.pause();
      }
    } else if (button.id === 'bg-settings-show') {
      if (!GamePage.gameOnSettings.bg.snow) {
        GamePage.snowInterval = setInterval(() => {
          this.createSnow();
          GamePage.gameOnSettings.bg.snow = true;
        }, 100);
      } else {
        clearInterval(GamePage.snowInterval);
        GamePage.gameOnSettings.bg.snow = false;
      }
    }
    //TODO: try this
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
      console.log(`choose-tree-1`);
      const centerDivTree = <HTMLElement>(
        this.container.querySelector('.game-main__center__tree')
      );
      centerDivTree.style.setProperty(
        '--game-center-tree',
        `url("../assets/tree/${button.id.match(/\d+/g)}.png")`
      );
    }
  }

  handlechooseBgImg(e: Event) {
    // console.log(`e`, e.target);
    const button = <HTMLElement>e.target;
    if (button.id.split('-')[0] === 'choose') {
      // console.log(`match /^\D+/g`, button.id.match(/\d/g));
      const centerDivBg = <HTMLElement>(
        this.container.querySelector('.game-main__center__bg')
      );
      centerDivBg.style.setProperty(
        '--game-center-bg',
        `url("../assets/bg/${button.id.match(/\d+/g)}.jpg")`
      );
    }
  }

  handlechooseLights(e: Event) {
    const button = <HTMLElement>e.target;
    // console.log(`e`, e.target);
    // let lightBulbs = <HTMLElement>this.centerSection.querySelector(
    //   '.game-main__center__light-bulbs'
    // );
    let lightBulbs: HTMLElement;

    !this.centerSection.querySelector('.game-main__center__light-bulbs')
      ? (lightBulbs = this.createTreeLights())
      : (lightBulbs = <HTMLElement>(
          this.centerSection.querySelector('.game-main__center__light-bulbs')
        ));

    if (button.id === 'choose-lights-checkbox') {
      if (!GamePage.gameOnSettings.treeLights.on) {
        // lightBulbs!.classList.toggle('on');
        GamePage.gameOnSettings.treeLights.on = true;
      } else {
        console.log(`else remove`);
        lightBulbs!.remove();
        GamePage.gameOnSettings.treeLights.on = false;
      }
    } else if (button.id === 'choose-lights-1') {
      console.log(`choose-lights-1`);
      if (!GamePage.gameOnSettings.treeLights.colored) {
        //if off > turn on lights
        lightBulbs!.classList.toggle('on');
        GamePage.gameOnSettings.treeLights.colored = true;
      } else {
        lightBulbs!.classList.toggle('on');
        GamePage.gameOnSettings.treeLights.colored = false;
      }
    }
    console.log(`GamePage.gameOnSettings`, GamePage.gameOnSettings);
  }

  createCenterSection() {
    // game-main__center__container

    const centerBg = <HTMLElement>(
      new Component('div', 'game-main__center__bg').render()
    );

    const centerTree = <HTMLElement>(
      new Component('div', 'game-main__center__tree').render()
    );
    centerBg.append(centerTree);

    this.centerSection.append(centerBg);
    this.container.append(this.centerSection);
  }

  createTreeLights(): HTMLElement {
    const centerBg = <HTMLElement>this.centerSection.firstElementChild;
    const lightBulbs = this.gameSections.centerTreeLights(
      new Component('div', 'game-main__center__light-bulbs').render()
    );
    centerBg.append(lightBulbs);
    return lightBulbs;
  }

  //TODO: colored snow
  /**
   * add colored snow
   * https://reactgo.com/css-snow-animation/
   *
   **/

  createSnow() {
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
    this.container.append(this.rightSection);
  }

  render() {
    this.createLeftSection();
    this.createCenterSection();
    this.createRightSection();
    return this.container;
  }
}

export default GamePage;
