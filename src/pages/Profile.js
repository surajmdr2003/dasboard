import React, { Fragment, useState, useEffect } from 'react';

/** Components */
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

// Services
import AdvertiserService from '../services/advertiser.service';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] =  useState({
    id: 4955,
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '91790',
    website: null,
    campaigns: {
      active: 0,
      inactive: 0,
      paused: 0,
      total: 0,
    },
    payments: [],
    billingHistory: null,
  }, []);

  useEffect(() => {
    setIsLoading(true);
    AdvertiserService.getAdvertiser(4955)
      .then((response) => {
        // Updating the response to the state
        setProfile(response.data);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Fragment>
      <PageTitleWithOutFilter/>
      <section className="profile-content">
        <div className="container">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="content-block">
                <div className="content-block-title">
                  Your profile
                </div>
                <div className="content-block-body">
                  {
                    isLoading
                      ? <div className="text-center m-5">
                        <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                      </div>
                      : <ul className="list-unstyled content-list">
                        <li>
                          <div className="media">
                            <span className="icon-box md-box icon-profile">
                              <img src="/assets/images/avatar.png" alt="company logo"/>
                            </span>
                            <div className="media-body">
                              <h5>{profile.name}</h5>
                              <p>{profile.email} | +1 (213) 393-3010 <br/> {profile.address}, {profile.city} {profile.state}</p>
                              <a href="#" className="btn-link">Edit Info</a>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <span className="icon-box md-box">
                              <i className="icon-campaign" />
                            </span>
                            <div className="media-body">
                              <h5>Campaigns</h5>
                              <ul className="campaigns-datas nav">
                                <li>
                                  {profile.campaigns.total} total campaigns
                                </li>
                                <li className="active-campaigns">
                                  {profile.campaigns.active} Active
                                </li>
                                <li className="inactive-campaigns">
                                  {profile.campaigns.inactive} Inactive
                                </li>
                                <li className="paused-campaigns">
                                  {profile.campaigns.paused} Paused
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <span className="icon-box md-box">
                              <i className="icon-card" />
                            </span>
                            <div className="media-body">
                              <h5>Payments</h5>
                              {
                                profile.payments.length
                                  ? profile.payments.map(() => {
                                    <p>
                                      <img src="./assets/images/paypal-logo.png" className="paypal-logo" alt="paypal icon"/> <br/>
                                        payment@midfirst.com | Added on 12th Jan 2020
                                    </p>;
                                  })
                                  : (<p>No payments available.</p>)
                              }
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <span className="icon-box md-box icon-billing">
                              <i className="icon-report" />
                            </span>
                            <div className="media-body">
                              <h5>Billing History</h5>
                              <p>12 bills raised <br/>Last billed on 14th Aug 2020 | Next bill on 14th Sep 2020</p>
                              <a href="#" className="btn-link">View Receipts</a>
                            </div>
                          </div>
                        </li>
                      </ul>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
