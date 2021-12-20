class SettingsSections {
  static controls = `
<div class="controls__filter-by-value">
  <h2 class="controls__filter-header">Sort by Value</h2>
  <div id="filter-by-shape" class="filter__btns filter__btns_shape">
    <h3 class="filter-btns__header">Shape</h3>
    <button id="shape-ball" class="btn" data-filter="ball"></button>
    <button id="shape-bell" class="btn" data-filter="bell"></button>
    <button id="shape-pinecone" class="btn" data-filter="pinecone"></button>
    <button id="shape-snowflake" class="btn" data-filter="snowflake"></button>
    <button id="shape-figurine" class="btn" data-filter="figurine"></button>
  </div>
  <div id="filter-by-color" class="filter__btns filter__btns_color">
    <h3 class="filter-btns__header">Color</h3>
    <button id="color-white" class="btn" data-filter="white"></button>
    <button id="color-yellow" class="btn" data-filter="yellow"></button>
    <button id="color-red" class="btn" data-filter="red"></button>
    <button id="color-blue" class="btn" data-filter="blue"></button>
    <button id="color-green" class="btn" data-filter="green"></button>
  </div>
  <div id="filter-by-size" class="filter__btns filter__btns_size">
    <h3 class="filter-btns__header">Size</h3>
    <button id="size-big" class="btn" data-filter="big"></button>
    <button id="size-medium" class="btn" data-filter="medium"></button>
    <button id="size-small" class="btn" data-filter="small"></button>
  </div>
  <div id="filter-by-favorite" class="filter__btns filter__btns_favorite">
    <h3 class="filter-btns__header">Favorite</h3>
    <input id="favorite-favorite" type="checkbox" data-filter="favorite" class="input" />
  </div>
</div>
<div class="controls__filter-by-range">
  <h2 class="controls__filter-header">Sort by Range</h2>
  <div id="slider-count" class="controls__slider slider">
    <h3 class="controls__filter-header">Quantity</h3>
      <div class="slider__inputs">
        <output class="slider__input__output">1</output>
        <div id="slider-count-count" class="slider__rail"></div>
        <output class="slider__input__output">12</output>
      </div>
  </div>
  <div id="slider-year" class="controls__slider slider">
    <h3 class="controls__filter-header">Year</h3>
      <div class="slider__inputs">
        <output class="slider__input__output">1940</output>
        <div id="slider-count-year" class="slider__rail"></div>
        <output class="slider__input__output">2020</output>
      </div>
  </div>
</div>
<div class="controls__filter-by-name">
<h2 class="controls__filter-header">More Sorting Settings</h2>
  <label for="dropdown-select"
    ></label>
  <div class="select">
    <select id="dropdown-select">
      <option id="dropdown-select-AZ" value="AZ">Alphabetically: A - Z</option>
      <option id="dropdown-select-ZA" value="ZA">Alphabetically: Z - A</option>
      <option id="dropdown-select-qtyUp" value="qtyUp">Quantity: 1 - 12</option>
      <option id="dropdown-select-qtyDown" value="qtyDown">Quantity: 12 - 1</option>
    </select>
    <span class="focus"></span>
  </div>
  <button id="reset-filters" type="button" class="btn controls_reset"> Reset All Filters</button>
  <button id="reset-localstorage" type="button" class="btn controls_reset">Reset Game</button>
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
