import React, { Fragment } from 'react';

/** Components */
import NotificationList from '../components/NotificationList';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

const Notifications = () => {
  return (
    <Fragment>
      <PageTitleWithOutFilter title="Notifications" />
      <section className="profile-content">
        <div className="container">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="content-block">
                <div className="content-block-title">
                  All Campaigns Notifications
                </div>
                <div className="content-block-body">
                  <ul className="list-unstyled content-list">
                    <NotificationList displaySummary={false} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Notifications;
