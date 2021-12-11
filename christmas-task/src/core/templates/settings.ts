class SettingsSections {
  static controls = `
      <div class="controls__filter-by-value">
        <h2 class="controls__filter-header">Sort by Value</h2>
        <div class="filter__btns">
          <h3 class="filter-btns__header">Form</h3>
          <button class="filter__btns btn" data-filer="шар"></button>
          <button class="filter__btns btn" data-filer="колокольчик"></button>
          <button class="filter__btns btn" data-filer="шишка"></button>
          <button class="filter__btns btn" data-filer="снежинка"></button>
          <button class="filter__btns btn" data-filer="фигурка"></button>
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
