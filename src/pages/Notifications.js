import React, { Fragment } from 'react';

/** Components */
import PageTitleWithFilter from '../components/PageTitleWithFilter';

const Notifications = () => {
  return (
    <Fragment>
      <PageTitleWithFilter/>
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
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-bulb" />
                        </span>
                        <div className="media-body">
                          <h5>Add responsive display ads</h5>
                          <p>Get more conversion at a similar CPA with responsive display ads, which automatically adapt to fit all devices</p>
                          <a href="#" className="btn-link">Notify Sales</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-pause" />
                        </span>
                        <div className="media-body">
                          <h5>Campaign paused</h5>
                          <p>You paused MFB Fall Checking 2020 - RAF AZ</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-bulb" />
                        </span>
                        <div className="media-body">
                          <h5>Add responsive display ads</h5>
                          <p>
                            Your campaign MFB Fall Checking 2020 - RAF AZ has ended.
                          </p>
                          <a href="#" className="btn-link">See Reports</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-Rectangle" />
                        </span>
                        <div className="media-body">
                          <h5>Add responsive display ads</h5>
                          <p>Get more conversion at a similar CPA with responsive display ads, which automatically adapt to fit all devices</p>
                          <a href="#" className="btn-link">NOTIFY SALES</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-pause" />
                        </span>
                        <div className="media-body">
                          <h5>Campaign paused</h5>
                          <p>You paused MFB Fall Checking 2020 - RAF AZ</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <span className="icon-box">
                          <i className="icon-Rectangle" />
                        </span>
                        <div className="media-body">
                          <h5>Add responsive display ads</h5>
                          <p>
                                                          Your campaign MFB Fall Checking 2020 - RAF AZ has ended.
                          </p>
                          <a href="#" className="btn-link">See Reports</a>
                        </div>
                      </div>
                    </li>
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
