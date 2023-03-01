import { makeAutoObservable } from 'mobx';

export default class ThemeStore {
  constructor() {
    this._isDark = false;
    makeAutoObservable(this);
  }
  setIsDark(bool) {
    this._isDark = bool;
  }
  get isDark() {
    return this._isDark;
  }
}
