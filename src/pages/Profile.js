import React, { Fragment, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';

/** Components */
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

const Profile = () => {
  const { user } = React.useContext(GlobalContext);
  const [state, setState] = useState({
    isLoading: false,
    profile: {
      id: '',
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      icon: '',
      zipCode: '91790',
      website: null,
      campaigns: {
        active: 0,
        inactive: 0,
        paused: 0,
        total: 0,
      },
      accountManager: {
        name: '',
        email: '',
        phone: '+1 (XXX) XXX-XXXX',
      },
      payments: [],
      billingHistory: null,
    },
  });

  useEffect(() => {
    setState({ ...state, isLoading: true });
    AdvertiserService.getAdvertiserProfile(user.id)
      .then(response => setState({
        ...state,
        isLoading: false,
        profile: {
          ...response.data,
          accountManager: response.data.accountManager
            ? response.data.accountManager
            : {
              name: '',
              email: '',
              phone: '+1 (XXX) XXX-XXXX',
            },
        },
      }))
      .catch(() => cogoToast.error('Unable to load user profile.', { position: 'bottom-left' }));
  }, [user.id]);

  return (
    <Fragment>
      <PageTitleWithOutFilter />
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
                    state.isLoading
                      ? <div className="text-center m-5">
                        <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                      </div>
                      : <ul className="list-unstyled content-list">
                        <li>
                          <div className="media">
                            <span className="icon-box md-box icon-profile">
                              <img src={(state.profile.icon ? state.profile.icon : '/assets/images/avatar.svg')} alt={user.name} />
                            </span>
                            <div className="media-body">
                              <h5>{state.profile.name}</h5>
                              <p>{state.profile.email} | {state.profile.phone || '+1 (XXX) XXX-XXXX'} <br /> {state.profile.address} {(state.profile.city || state.profile.state) ? ', ' : ''} {state.profile.city} {state.profile.state}</p>
                              {/* <a href="#" className="btn-link">Edit Info</a> */}
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
                                  {state.profile.campaigns.total} Total campaigns
                                </li>
                                <li className="active-campaigns">
                                  {state.profile.campaigns.active} Active
                                </li>
                                <li className="inactive-campaigns">
                                  {state.profile.campaigns.inactive} Inactive
                                </li>
                                <li className="paused-campaigns">
                                  {state.profile.campaigns.paused} Paused
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <span className="icon-box md-box">
                              <img src="/assets/images/user.svg" alt="Account Manager" />
                            </span>
                            <div className="media-body">
                              <h5>Account manager</h5>
                              <p className="mb-0">
                                {state.profile.accountManager.name} | {state.profile.accountManager.phone || '+1 (XXX) XXX-XXXX'} | {state.profile.accountManager.email || 'XXXXXXXX@XXXX.XXX'}</p>
                            </div>
                          </div>
                        </li>
                        {/* <li>
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
                        </li> */}
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
