// Custom Configs
import Config from '../../app.config';

export default class Storage {
  /**
   * Constructor for localStorage
   */
  constructor() {
    if (!window.localStorage) {
      // 'Please check, localStorage does not seem to be supoorted in your browser';
    }
  }

  /**
   * Sets the given key value pair in local storage
   * @param {String} key
   * @param {object / String} value
   */
  static setItem(key, value) {
    return window.localStorage.setItem(key, value);
  }

  /**
   * Gets the given key item
   * @param {String} key
   */
  static getItem(key) {
    return window.localStorage.getItem(key);
  }

  /**
   * Removes the given key item
   * @param {String} key
   */
  static removeItem(key) {
    return window.localStorage.removeItem(key);
  }

  /**
   * Clears all local storage data
   */
  static clear() {
    return window.localStorage.clear();
  }

  /**
   *  Reset when storage is more than 24hours
   *  @returns Boolean
   */
  static checkSession() {
    const hours = parseFloat(Config.sessionTimeout);
    const now = new Date().getTime();
    const setupTime = localStorage.getItem('setupTime');
    let isValid = false;

    if (setupTime === null) {
      localStorage.setItem('setupTime', now);
    } else {
      if ((now - setupTime) > hours * 60 * 60 * 10000) {
        isValid = false;
        Storage.clear();
        window.location = '/auth/login';
      } else {
        isValid = true;
        localStorage.setItem('setupTime', now);
      }
    }

    return isValid;
  }
}
