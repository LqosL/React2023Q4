export default class Ls_wrapper {
  private storage: Storage;
  constructor(storage: Storage = window.localStorage) {
    this.storage = storage
  }
  getLastSearch(): string {
    return this.storage.getItem('lastSearch') || '';
  }
  setLastSearch(string: string): void {
    this.storage.setItem('lastSearch', string);
  }
}

export const DefaultLs_wrapper: Ls_wrapper = new Ls_wrapper();
