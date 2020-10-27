import moment from 'moment';

/**
 * For Initial start date and end date
 */
const now = new Date();
const start = moment(start).subtract(29, 'days').format('YYYY-MM-DD');
const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');

const dateRange = {
  startDate: start,
  endDate: end,
};

export default {dateRange: dateRange};
