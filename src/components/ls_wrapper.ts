export default class Ls_wrapper {
  getLastSearch() {
    return window.localStorage.getItem('lastSearch') || '';
  }
  setLastSearch(string: string) {
    window.localStorage.setItem('lastSearch', string);
  }
}

export const DefaultLs_wrapper = new Ls_wrapper();
