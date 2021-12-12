class SettingsSections {
  static controls = `
    <div class="controls__filter-by-value">
      <h2 class="controls__filter-header">Sort by Value</h2>
      <div id="filter-by-shape" class="filter__btns">
        <h3 class="filter-btns__header">Shape</h3>
        <button class="btn" data-filter="шар"></button>
        <button class="btn" data-filter="колокольчик"></button>
        <button class="btn" data-filter="шишка"></button>
        <button class="btn" data-filter="снежинка"></button>
        <button class="btn" data-filter="фигурка"></button>
      </div>
      <div id="filter-by-color" class="filter__btns">
        <h3 class="filter-btns__header">Color</h3>
        <button class="btn" data-filter="белый"></button>
        <button class="btn" data-filter="желтый"></button>
        <button class="btn" data-filter="красный"></button>
        <button class="btn" data-filter="синий"></button>
        <button class="btn" data-filter="зелёный"></button>
      </div>
      <div id="filter-by-size" class="filter__btns">
        <h3 class="filter-btns__header">Size</h3>
        <button class="btn" data-filter="большой"></button>
        <button class="btn" data-filter="средний"></button>
        <button class="btn" data-filter="малый"></button>
      </div>
      <div id="filter-by-favorite" class="filter__btns">
        <h3 class="filter-btns__header">Favourite</h3>
        <input type="checkbox" data-filter="favourite"/>
      </div>
    </div>
    <div class="controls__filter-by-range">
      <h2 class="controls__filter-header">Sort by Range</h2>
    </div>
    <div class="controls__filter-by-name">
      <h2 class="controls__filter-header">Sort by Name</h2>
    </div>
    `;

  static cards = `
  <h2 class="card__title">{{name}}</h2>
  <img class="card__img" src="./assets/toys/{{num}}.png" alt="toy" />
  <div class="card__description">
    <p id="count" class="card__description__property"><span>Количество:{{count}}</span></p>
    <p id="year" class="card__description__property"><span>Год покупки:{{year}}</span></p>
    <p id="shape" class="card__description__property"><span>Форма:{{shape}}</span></p>
    <p id="color" class="card__description__property"><span>Цвет:{{color}}</span></p>
    <p id="size" class="card__description__property"><span>Размер:{{size}}</span></p>
    <p if="favorite" class="card__description__property"><span>Любимая:{{favorite}}</span></p>
  </div>
    `;
}

export default SettingsSections;
