import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export default class UserStore {
  _user;
  _isAuth;

  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'Current user',
      properties: ['_user', '_isAuth'],
      storage: localStorage,
      expireIn: 86400000,
    });
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
