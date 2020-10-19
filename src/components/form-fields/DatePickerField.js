import React from 'react';
import { PropTypes } from 'prop-types';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment from 'moment';

const DatePickerField = (props) => {
  const now = new Date();

  const start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );

  const end = moment(start)
    .add(1, 'days')
    .subtract(1, 'seconds');

  const ranges = {
    'Today': [moment(start), moment(end)],
    'Yesterday': [
      moment(start).subtract(1, 'days'),
      moment(end).subtract(1, 'days'),
    ],
    '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
    '5 Days': [moment(start).subtract(5, 'days'), moment(end)],
    '1 Week': [moment(start).subtract(6, 'days'), moment(end)],
    '2 Weeks': [moment(start).subtract(13, 'days'), moment(end)],
    '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
    '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
  };

  const local = {
    format: 'DD-MM-YYYY',
    sundayFirst: false,
  };

  const datePickerStyle = {
    fromDot: { backgroundColor: 'green' },
    toDot: { backgroundColor: 'red' },
    fromDate: { color: '#fff', backgroundColor: '#22a6de' },
    toDate: { backgroundColor: '#22a6de' },
    betweenDates: { color: '#606060', backgroundColor: '#e5f8fc' },
    hoverCell: { color: '#22a6de', backgroundColor: '#e5f8fc' },
    customRangeButtons: { color: '#252841', backgroundColor: 'transparent' },
    customRangeSelected: { color: '#22a6de', backgroundColor: 'transparent' },
  };

  return (
    <DateTimeRangeContainer
      ranges={ranges}
      start={start}
      end={end}
      local={local}
      style={datePickerStyle}
      noMobileMode={true}
      screenWidthToTheRight={true}
      applyCallback={props.applyCallback}
      smartMode
    >
      <button type="button" className="btn btn-outline-primary btn-date-picker">{props.label}</button>
    </DateTimeRangeContainer>
  );
};

DatePickerField.propTypes = {
  applyCallback: PropTypes.func,
  label: PropTypes.string,
};

export default DatePickerField;
