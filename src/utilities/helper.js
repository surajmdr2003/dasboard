import moment from 'moment';

class Helper {
  /**
   * Check if the object is empty
   * @param obj
   * @param Boolean
   */
  isEmpty(obj) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    if (obj === null) return true;
    if (obj === undefined) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== 'object') return true;

    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  /**
   * Returns the difference beteween two dates in days
   * @param {String} fromDate
   * @param {String} toDate
   */
  getDays(fromDate, toDate) {
    const start = moment(fromDate || new Date());
    const end = moment(toDate || new Date());

    return end.diff(start, 'days');
  }

  /**
   * Formats the given date in given format
   * @param {String} date
   * @param {String} format
   */
  formatdate(date, format = 'MMM-DD-YYYY') {
    return date !== undefined && moment(date).format(format);
  }

  /**
   * Returns the type of given data
   * @param {Any} givenData
   * @param {string} askedType
   */
  toBeType(givenData, askedType) {
    const initialType = typeof givenData;
    const type = initialType === 'object' ? Array.isArray(givenData) ? 'array' : initialType : initialType;

    return type === askedType ? {
      message: () => `expected ${givenData} to be type ${askedType}`,
      pass: true,
    } : {
      message: () => `expected ${givenData} to be type ${askedType}`,
      pass: false,
    };
  }

  /**
   * Updates state with given value
   * @param {Object} state Current State
   * @param {String} key Dot seperated string
   * @param {String} value Value to be set
   *
   * @return {Object}
   */
  updateObject(state, key, value) {
    let currentState = state;
    const propChain = key.split('.') || [];

    for (let p = 0; p < propChain.length; p++) {
      if (currentState && currentState.hasOwnProperty(propChain[p])) {
        if (p !== (propChain.length - 1)) {
          currentState = currentState[propChain[p]];
        } else {
          currentState[propChain[p]] = value;
        }
      }
    }

    return currentState;
  }

  /**
   * Filter data in the list based on given value
   * @param {Array} list
   * @param {String} key
   * @param {String} value
   * @param {Array} fblist
   */
  filterData(list, key, value, fblist) {
    const updatedList = JSON.parse(JSON.stringify(list));

    const newList = value ?
      updatedList.filter((item) => {
        return item[1].data[key].toLowerCase().search(value.toLowerCase()) !== -1;
      }) :
      fblist;

    return newList.length >= 1 ? newList : [];
  }

  /**
   * Gets the list of all countries
   * @return {Array}
   */
  getCountries() {
    return ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']
      .map((country, index) => {
        return {
          id: index,
          label: country,
        };
      });
  }

  /**
   * Return Item by its index number
   * @param {Array[Object]} list
   * @param {Integer} index
   * @param {Object|Array} fbObj
   * @returns {string}
   */
  getItemByIndex(list, index = 0, fbObject = {}) {
    return (list[index] !== undefined) ?
      list[index] :
      fbObject ? fbObject : {};
  }

  /**
   * Generate notification message
   * @param {String} subscriber
   * @param {String} message
   */
  generateNotificationMsg(subscriber, title, message) {
    return {
      isSeen: false,
      subscriberId: subscriber,
      title: title,
      message: message,
      time: new Date(),
    };
  }

  /**
   * Calculate time ago string
   * @param {DATE} dateTime
   */
  timeAgo(dateTime) {
    let formttedTimeStr = '';
    const templates = {
      prefix: '',
      suffix: ' ago',
      seconds: 'Less than a minute',
      minute: 'About a minute',
      minutes: '%d minutes',
      hour: 'About an hour',
      hours: 'About %d hours',
      day: 'A day',
      days: '%d days',
      month: 'About a month',
      months: '%d months',
      year: 'About a year',
      years: '%d years',
    };
    const template = (t, n) => {
      return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    const timer = (time) => {
      let timeStr = time;

      if (!timeStr) return;

      timeStr = timeStr.replace(/\.\d+/, ''); // remove milliseconds
      timeStr = timeStr.replace(/-/, '/').replace(/-/, '/');
      timeStr = timeStr.replace(/T/, ' ').replace(/Z/, ' UTC');
      timeStr = timeStr.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
      timeStr = new Date(timeStr * 1000 || timeStr);

      const now = new Date();
      const seconds = ((now.getTime() - timeStr) * 0.001) >> 0;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;
      const years = days / 365;

      formttedTimeStr = templates.prefix + (
        seconds < 45 && template('seconds', seconds) ||
        seconds < 90 && template('minute', 1) ||
        minutes < 45 && template('minutes', minutes) ||
        minutes < 90 && template('hour', 1) ||
        hours < 24 && template('hours', hours) ||
        hours < 42 && template('day', 1) ||
        days < 30 && template('days', days) ||
        days < 45 && template('month', 1) ||
        days < 365 && template('months', days / 30) ||
        years < 1.5 && template('year', 1) ||
        template('years', years)
      ) + templates.suffix;
    };

    // Get formatted time
    timer(dateTime);

    return formttedTimeStr;
  }

  /**
   * Filter Orders by date
   * @param {Object} data
   * @param {String} type
   */
  sortByDate(data, property, type) {
    const result = data.sort((d1, d2) => {
      if (type === 'desc') {
        return new Date(d2[property]).getTime() - new Date(d1[property]).getTime();
      }

      return new Date(d1[property]).getTime() - new Date(d2[property]).getTime();
    });

    return result;
  }
}

export default new Helper();
