import moment from 'moment';

/**
 * For Initial start date and end date
 */
const now = new Date();

const start = moment(
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
);

const end = moment(start)
  .add(1, 'days')
  .subtract(1, 'seconds');

const dateRange = {
  startDate: moment(start).subtract(1, 'months').format('YYYY-MM-DD'),
  endDate: moment(end).format('YYYY-MM-DD'),
};

export default {dateRange: dateRange};
