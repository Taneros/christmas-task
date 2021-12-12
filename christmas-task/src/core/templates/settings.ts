class SettingsSections {
  static controls = `
      <div class="controls__filter-by-value">
        <h2 class="controls__filter-header">Sort by Value</h2>
        <div id="filter-by-shape" class="filter__btns">
          <h3 class="filter-btns__header">Shape</h3>
          <button class="filter__btns btn" data-filter="шар"></button>
          <button class="filter__btns btn" data-filter="колокольчик"></button>
          <button class="filter__btns btn" data-filter="шишка"></button>
          <button class="filter__btns btn" data-filter="снежинка"></button>
          <button class="filter__btns btn" data-filter="фигурка"></button>
      </div>
      <div id="filter-by-color" class="filter__btns">
          <h3 class="filter-btns__header">Color</h3>
          <button class="filter__btns btn" data-filter="белый"></button>
          <button class="filter__btns btn" data-filter="желтый"></button>
          <button class="filter__btns btn" data-filter="красный"></button>
          <button class="filter__btns btn" data-filter="синий"></button>
          <button class="filter__btns btn" data-filter="зелёный"></button>
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
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    `;
}

export default SettingsSections;
