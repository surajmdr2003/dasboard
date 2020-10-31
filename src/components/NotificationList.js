import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';
import NotificationService from '../services/notification.service';

const NavigationList = (props) => {
  const {user} = React.useContext(GlobalContext);
  const [notifications, setNotifications] = useState([]);
  const iconMap = {
    'IDEA': 'icon-bulb',
    'STOPPED': 'icon-Rectangle',
    'PAUSED': 'icon-pause',
  };

  const loadNotifications = () => {
    return AdvertiserService.getAdvertiserNotifications(user.id)
      .then((response) => {
        setNotifications((props.displaySummary ? response.data.slice(0, 3) : response.data) || []);
      })
      .catch(() => console.log('No Notifications available for user: ' + user.id));
  };

  const makeApiCall = (event, notificationId, actionType) => {
    event.preventDefault();
    let linkWindow;

    NotificationService.getNotificationAction(notificationId)
      .then((response) => {
        if (actionType === 'STATIC_URL') {
          // Redirect to the report url
          linkWindow = window.open('', '_blank');
          linkWindow.location = response.data.value;
        }

        if (actionType === 'API_CALL') {
          alert(response.data.value);
        }
      })
      .catch(() => console.log('No Notifications available for user: ' + user.id));
  };

  const getActionTypeLabel = (notificationId, actionType, action) => {
    return actionType !== 'NO_ACTION' ? <a href="#" onClick={(e) => makeApiCall(e, notificationId, actionType)} className="btn-link">{action}</a> : '';
  };

  useEffect(() => {
    loadNotifications();
  }, [user.id]);

  return (
    <Fragment>
      {
        notifications.length < 1
          ? <li className="media">
            <i className="icon-notification" />
            <div className="media-body">
              <h5>No Notifications available</h5>
            </div>
          </li>
          : ''
      }
      {
        notifications.map((notification) => (
          <li key={notification.id} className="media">
            <span className="icon-box mr-3">
              <i className={iconMap[notification.icon]} />
            </span>
            <div className="media-body">
              <h5>{notification.title}</h5>
              <p>{notification.description}</p>
              {getActionTypeLabel(notification.id, notification.actionType, notification.actionName)}
            </div>
          </li>
        ))
      }
    </Fragment>
  );
};

NavigationList.propTypes = {
  displaySummary: PropTypes.bool,
};

export default NavigationList;
