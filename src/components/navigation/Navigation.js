import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import PubSub from 'pubsub-js';

// Components
import NavDropdownCampaign from './NavDropdownCampaign';
import NavDropdownCreatives from './NavDropdownCreatives';

// Services
import AuthService from '../../services/auth.service';
import AdvertiserService from '../../services/advertiser.service';

const Navigation = () => {
  const [campaignList, setCampaignList] = useState(window.$campaigns);
  const [currentUser, setCurrentUser] = useState({
    fullname: null,
    username: null,
    permissions: [],
  });

  const loadCampaignsData = () => {
    return AdvertiserService.getAdvertiser()
      .then((advertiser) => {
        AdvertiserService.getAdvertiserCampaignGroups(advertiser.data.id)
          .then((response) => {
            window.$campaigns = response.data;
            PubSub.publish('CAMPAIGNS:LOADED', response.data);
            setCampaignList(response.data);
          });
      })
      .catch(() => false);
  };

  const loadCurrentUser = () => {
    return AuthService.getSessionInfo()
      .then(session => {
        setCurrentUser({
          fullname: session.getIdToken().payload.name,
          username: session.getIdToken().payload['cognito:username'],
          permissions: session.getAccessToken().payload['cognito:groups'],
        });
      });
  };

  useEffect(() => {
    loadCurrentUser();
    window.$campaigns.length === 0 && loadCampaignsData();
  }, []);

  const isNavItemActive = (path) => {
    return location.pathname.indexOf(path) !== -1;
  };

  return (
    <Fragment>
      <button className="navbar-toggler" onClick={() => toggleDropdown(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -53 384 384">
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </button>

      <div className={`collapse navbar-collapse primary-navigation ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li><NavLink activeClassName={'active'} exact={true} to="/dashboard">Dashboard</NavLink></li>
          <li className="menu-item-has-children"><NavLink activeClassName={'active'} to={'/dashboard/campaigns'}>Campaigns</NavLink>
            <NavDropdownCampaign campaignNavItems={campaignList} />
          </li>
          <li className="menu-item-has-children"><NavLink isActive={() => isNavItemActive('/dashboard/creatives/')} to={`/dashboard/creatives/${campaignList.length ? campaignList[0].id : ''}`}>Creatives</NavLink>
            <NavDropdownCreatives campaignNavItems={campaignList} />
          </li>
          <li><NavLink isActive={() => isNavItemActive('/dashboard/landing-pages/')} to={`/dashboard/landing-pages/${campaignList.length ? campaignList[0].id : ''}`} >Landing pages</NavLink></li>
          <li><NavLink isActive={() => isNavItemActive('/dashboard/targeting/')} to={`/dashboard/targeting/${campaignList.length ? campaignList[0].id : ''}`}> Targeting</NavLink></li>
          <li><NavLink isActive={() => isNavItemActive('/dashboard/stats/')} to={`/dashboard/stats/${campaignList.length ? campaignList[0].id : ''}`}>Stats</NavLink></li>
          <li><NavLink isActive={() => isNavItemActive('/dashboard/reports/')} to={`/dashboard/reports/${campaignList.length ? campaignList[0].id : ''}`}>Report</NavLink></li>
        </ul>
        <ul className="navbar-nav align-items-center secondary-menu">
          <li><i className="icon icon-notification" />
            <div className="dropdown-menu notification-dropdown-menu">
              <div className="notification-header">
                Notifications <Link to="/dashboard/all-notifications.html" className="btn-link">See All</Link>
              </div>
              <ul className="notifications list-unstyled">
                <li className="media">
                  <span className="icon-box mr-3">
                    <i className="icon-bulb" />
                  </span>
                  <div className="media-body">
                    <h5>Adds responsive display ads</h5>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>
                    <Link to="#" className="btn-link">Notify Sales</Link>
                  </div>
                </li>
                <li className="media">
                  <span className="icon-box mr-3">
                    <i className="icon-pause" />
                  </span>
                  <div className="media-body">
                    <h5>List-based media object</h5>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin.</p>
                  </div>
                </li>
                <li className="media">
                  <span className="icon-box mr-3">
                    <i className="icon-Rectangle" />
                  </span>
                  <div className="media-body">
                    <h5>List-based media object</h5>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin. Cras purus odio,</p>
                    <Link to="#" className="btn-link">See Report</Link>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="menu-profile media">
              <img src="/assets/images/avatar.png" className="profile-icon align-self-center mr-3"
                alt="Midfirst Bank's profile picture" />
              <div className="media-body  align-self-center">
                <h6 className="mt-0">{currentUser.fullname}</h6>
              </div>
            </div>
            <ul className="dropdown-menu profile-dropdown-menu">
              <li>
                <Link to="/dashboard/login">Login</Link>
              </li>
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <Link to="#">Payment setting</Link>
              </li>
              <li>
                <Link to="/dashboard/billing">Billing history</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <a href="#" onClick={() => Auth.signOut()}>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navigation;
