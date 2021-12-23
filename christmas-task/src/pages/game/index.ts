import Component from '../../core/templates/component';
import GameSections from '../../core/templates/game';
import Page from '../../core/templates/page';

class GamePage extends Page {
  private leftSection: HTMLElement;
  private centerSection: HTMLElement;
  private rightSection: HTMLElement;
  gameSections: GameSections;

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
    if (button.id === 'bg-settings-audio') console.log(`turn on audio`);
    else if (button.id === 'bg-settings-show') console.log(`turn on snow`);
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
    // console.log(`e`, e.target);
    const button = <HTMLElement>e.target;
    if (button.id === 'choose-lights-1') console.log(`choose-lights-1`);
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
