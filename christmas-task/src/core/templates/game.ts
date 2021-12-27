class GameSections {
  leftBgSettings(el: HTMLElement): HTMLElement {
    el.innerHTML = `
      <div class="bg-settings">
        <button id="bg-settings-audio" class="bg-settings__audio__btn btn"></button>
        <button id="bg-settings-snow" class="bg-settings__snow__btn btn"></button>
      </div>
    `;
    return el;
  }

  leftChooseTree(el: HTMLElement): HTMLElement {
    el.innerHTML = `
    <h2 class="heading">Выбрать Ёлку</h2>
    <div class="choose-tree">
      <div id="choose-tree-1" class="choose-tree__card"></div>
      <div id="choose-tree-2" class="choose-tree__card"></div>
      <div id="choose-tree-3" class="choose-tree__card"></div>
      <div id="choose-tree-4" class="choose-tree__card"></div>
    </div>
    `;
    return el;
  }

  leftChooseTreeBG(el: HTMLElement): HTMLElement {
    el.innerHTML = `
    <h2 class="heading heading__h2">Выбрать Фон</h2>
    <div class="choose-bg">
      <div id="choose-bg-1" class="choose-bg__card"></div>
      <div id="choose-bg-2" class="choose-bg__card"></div>
      <div id="choose-bg-3" class="choose-bg__card"></div>
      <div id="choose-bg-4" class="choose-bg__card"></div>
      <div id="choose-bg-5" class="choose-bg__card"></div>
      <div id="choose-bg-6" class="choose-bg__card"></div>
      <div id="choose-bg-7" class="choose-bg__card"></div>
      <div id="choose-bg-8" class="choose-bg__card"></div>
    </div>
    `;
    return el;
  }

  leftChooseLights(el: HTMLElement): HTMLElement {
    el.innerHTML = `
    <h2 class="heading heading__h2">Выбрать Гирлянду</h2>
    <div class="choose-lights">
      <button id="choose-lights-1" class="choose-lights__btn btn" data-theme-color="one"></button>
      <button id="choose-lights-2" class="choose-lights__btn btn" data-theme-color="two"></button>
      <button id="choose-lights-3" class="choose-lights__btn btn" data-theme-color="three"></button>
      <button id="choose-lights-4" class="choose-lights__btn btn" data-theme-color="four"></button>
      <button id="choose-lights-5" class="choose-lights__btn btn" data-theme-color="five"></button>
      <label class="choose-lights__label label">
      <input
        class="choose-lights__input"
        id="choose-lights-checkbox"
        type="checkbox"
        name="lights"
      />
      <span class="slider round"></span>
      </label>
    </div>
    `;
    return el;
  }

  centerTreeLights(el: HTMLElement): HTMLElement {
    el.innerHTML = `
      <div class="game-main__center__light-bulbs">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
      </div>
      <div class="game-main__center__light-bulbs">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
      </div>
      <div class="game-main__center__light-bulbs">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
      </div>
      <div class="game-main__center__light-bulbs">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
      </div>
      <div class="game-main__center__light-bulbs">
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
        <div class="light-bulb theme-color-five"></div>
        <div class="light-bulb theme-color-one"></div>
        <div class="light-bulb theme-color-two"></div>
        <div class="light-bulb theme-color-three"></div>
        <div class="light-bulb theme-color-four"></div>
      </div>
    `;
    return el;
  }

  cardsFromBasketImg(): string {
    const el = `
    <img
      class="toy__card__img"
      src="./assets/toys/{{img}}.png"
      alt="toy"
    />
    `;
    return el;
  }

  cardsFromBasketDivQty(): string {
    const el = `

    <div class="toy__card__qty">{{qty}}</div>
    `;

    return el;
  }
}

export default GameSections;
