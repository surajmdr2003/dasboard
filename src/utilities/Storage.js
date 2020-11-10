export default class Storage {
  /**
     * Constructor for localStorage
     */
  constructor() {
    if (!window.localStorage) {
      /* eslint-disable */
        alert('Sorry, your browser does not support the LocalStorage feature.');
        /* eslint-enable */
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
}
