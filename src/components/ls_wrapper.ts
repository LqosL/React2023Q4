export default class Ls_wrapper {
  getLastSearch(): string {
    return window.localStorage.getItem('lastSearch') || '';
  }
  setLastSearch(string: string): void {
    window.localStorage.setItem('lastSearch', string);
  }
}

export const DefaultLs_wrapper: Ls_wrapper = new Ls_wrapper();
