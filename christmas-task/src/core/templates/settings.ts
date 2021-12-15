class SettingsSections {
  static controls = `
<div class="controls__filter-by-value">
  <h2 class="controls__filter-header">Sort by Value</h2>
  <div id="filter-by-shape" class="filter__btns filter__btns_shape">
    <h3 class="filter-btns__header">Shape</h3>
    <button class="btn" data-filter="ball"></button>
    <button class="btn" data-filter="bell"></button>
    <button class="btn" data-filter="pinecone"></button>
    <button class="btn" data-filter="snowflake"></button>
    <button class="btn" data-filter="figurine"></button>
  </div>
  <div id="filter-by-color" class="filter__btns filter__btns_color">
    <h3 class="filter-btns__header">Color</h3>
    <button class="btn" data-filter="white"></button>
    <button class="btn" data-filter="yellow"></button>
    <button class="btn" data-filter="red"></button>
    <button class="btn" data-filter="blue"></button>
    <button class="btn" data-filter="green"></button>
  </div>
  <div id="filter-by-size" class="filter__btns filter__btns_size">
    <h3 class="filter-btns__header">Size</h3>
    <button class="btn" data-filter="big"></button>
    <button class="btn" data-filter="medium"></button>
    <button class="btn" data-filter="small"></button>
  </div>
  <div id="filter-by-favorite" class="filter__btns filter__btns_favorite">
    <h3 class="filter-btns__header">Favorite</h3>
    <input type="checkbox" data-filter="favorite" class="input" />
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
