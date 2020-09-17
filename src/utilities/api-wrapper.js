import axios from 'axios';
import Api from './api';
import Storage from './storage';

class ApiWrapper {
  // Variables
  headers;

  // Constructor
  constructor() {
    this.setHeaders();
  }

  /**
   * Set Headers
   */
  setHeaders() {
    // Common Headers
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Gets Defined Headers
   */
  getHeaders() {
    return this.setHeaders();
  }

  /**
   * Makes GET call to api
   * @param {String} url
   * @param {Boolean} requiresAuth
   *
   * @returns {Promise}
   */
  get(url, requiresAuth = false) {
    Storage.checkSession();
    const token = Storage.getItem('token');

    return Api.get(url, {
      headers: requiresAuth
        ? Object.assign(this.headers, {
          'Authorization': 'Bearer ' + token,
        })
        : this.headers,
    }).then(response => response.data);
  }

  /**
   * Makes POST call to api
   * @param {String} url
   * @param {Object} data
   * @param {Boolean} requiresAuth
   *
   * @returns {Promise}
   */
  post(url, data, requiresAuth = false) {
    Storage.checkSession();
    const token = Storage.getItem('token');

    return Api.post(url, data, {
      headers: requiresAuth
        ? Object.assign(this.headers, {
          'Authorization': 'Bearer ' + token,
        })
        : this.headers,
    }).then(response => response.data);
  }

  /**
   * Makes UPDATE call to api
   * @param {String} url
   * @param {Object} data
   * @param {Boolean} requiresAuth
   *
   * @returns {Promise}
   */
  update(url, data, requiresAuth = false) {
    Storage.checkSession();
    const token = Storage.getItem('token');

    return Api.put(url, data, {
      headers: requiresAuth ?
        Object.assign(this.headers, {
          'Authorization': 'Bearer ' + token,
        }) :
        this.headers,
    }).then(response => response.data);
  }

  /**
   * Makes Delete call to api
   * @param {String} url
   * @param {Boolean} requiresAuth
   *
   * @returns {Promise}
   */
  delete(url, requiresAuth = false) {
    Storage.checkSession();
    const token = Storage.getItem('token');

    return Api.delete(url, {
      headers: requiresAuth
        ? Object.assign(this.headers, {
          'Authorization': 'Bearer ' + token,
        })
        : this.headers,
    }).then(response => response.data);
  }

  /**
   * Resolves all given requests
   * @param {Array[Promise]} requests
   *
   * @returns {Promise}
   */
  async all(requests) {
    return await axios.all(requests)
      .then(axios.spread((...response) => {
        return [...response];
      }));
  }
}

export default ApiWrapper = new ApiWrapper();
