class SearchInput {
  static searchForm = `
    <form class="search-container__form" action="#">
      <input
        class="search-container__input"
        id="search-box-input"
        type="search"
        autocomplete="off"
        placeholder="Найти игрушку"
        name="search"
        autofocus
        onkeypress="return event.keyCode!=13"
      />
    </form>
`;
}

export default SearchInput;
