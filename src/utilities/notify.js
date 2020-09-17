import {notify} from 'react-notify-toast';

class Notify {
  // Variables
  myColor = '';

  /**
   * Costructor
   */
  constructor() {
    this.myColor = { text: '#FFFFFF' };
  }

  /**
   * Shows Error Message
   * @param {String} message
   */
  error(message) {
    Object.assign(this.myColor, { background: 'red'});
    notify.show(message, 'custom', 3000, this.myColor);
  }

  /**
   * Shows Info Message
   * @param {String} message
   */
  info(message) {
    Object.assign(this.myColor, { background: 'blue'});
    notify.show(message, 'custom', 3000, this.myColor);
  }

  /**
   * Shows Success Message
   * @param {String} message
   */
  success(message) {
    Object.assign(this.myColor, { background: '#4CAF50'});
    notify.show(message, 'custom', 3000, this.myColor);
  }

  /**
   * Shows Warning Message
   * @param {String} message
   */
  warning(message) {
    Object.assign(this.myColor, { background: 'orange'});
    notify.show(message, 'custom', 3000, this.myColor);
  }
}

export default new Notify();
