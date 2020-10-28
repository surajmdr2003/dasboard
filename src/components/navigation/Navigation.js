import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import PubSub from 'pubsub-js';
import _debounce from 'lodash/debounce';

// Context
import GlobalContext from '../../context/GlobalContext';

// Components
import NavDropdownCampaign from './NavDropdownCampaign';
import NavDropdownCreatives from './NavDropdownCreatives';

// Services
import AdvertiserService from '../../services/advertiser.service';

const Navigation = () => {
  const {user, setUser, setActiveCampaign} = React.useContext(GlobalContext);
  const [campaignList, setCampaignList] = useState(window.$campaigns);
  const [avaliableUsers, setAvailableUsers] = useState([]);
  const [isSearching, setIsSearcing] = useState(false);
  const [isOpen, toggleDropdown] = useState(false);
  const initCampaigns = {id: null, name: 'No Campaign Found'};

  const loadCampaignsData = () => {
    return AdvertiserService.getAdvertiserCampaignGroups(user.id)
      .then((response) => {
        window.$campaigns = response.data.length ? response.data : [];
        PubSub.publish('CAMPAIGNS:LOADED', response.data);
        setActiveCampaign(response.data.length ? response.data[0] : initCampaigns);
        setCampaignList(response.data);
      })
      .catch(() => console.log('No campaigns available for user: ' + user.id));
  };

  /**
   * Check User Permission for user switch
   */
  const checkPermission = () => {
    return user ? user.permissions.includes('ROLE_USER') && user.permissions.includes('ROLE_ADMIN') : false;
  };

  // Debouncing the change event
  const handleSearchAdvertisers = _debounce(query => searchAdvertisers(query), 500);

  /**
   * Searcning the Advertisers
   * @param {String} searchQuery
   */
  const searchAdvertisers = (searchQuery) => {
    setIsSearcing(true);
    AdvertiserService.searchAdvertisers(searchQuery)
      .then(response => {
        setAvailableUsers(response.data.content);
        setIsSearcing(false);
      });
  };

  useEffect(() => {
    loadCampaignsData();
  }, [user.id]);

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
          <li className="menu-item-has-children"><NavLink to="/dashboard/creatives">Creatives</NavLink>
            <NavDropdownCreatives campaignNavItems={campaignList} />
          </li>
          <li><NavLink to="/dashboard/landing-pages">Landing pages</NavLink></li>
          <li><NavLink to="/dashboard/targeting">Targeting</NavLink></li>
          <li><NavLink to="/dashboard/stats">Stats</NavLink></li>
          <li><NavLink to="/dashboard/reports">Report</NavLink></li>
        </ul>
        <ul className="navbar-nav align-items-center secondary-menu">
          {
            checkPermission()
              ? <li>
                <i className="icon icon-advertiser"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                  <g fill="none" fillRule="evenodd">
                    <g fill="#A0A0A0" fillRule="nonzero">
                      <path d="M1140.833 26.938v3.125c0 .517-.42.937-.937.937h-3.958c-.518 0-.938-.42-.938-.938v-3.125c0-.517.42-.937.938-.937h3.958c.518 0 .937.42.937.938zm7.084 9.375v-3.126c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.938.42-.938.938v3.124c0 .518.42.938.938.938h3.958c.518 0 .938-.42.938-.938zm1.25-9.376v3.125c0 .518.42.938.937.938h3.958c.518 0 .938-.42.938-.938v-3.125c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.937.42-.937.938zm-1.25 3.125v-3.125c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.938.42-.938.938v3.125c0 .517.42.937.938.937h3.958c.518 0 .938-.42.938-.938zm-8.021 2.188h-3.958c-.518 0-.938.42-.938.938v3.124c0 .518.42.938.938.938h3.958c.518 0 .937-.42.937-.938v-3.124c0-.518-.42-.938-.937-.938zM1135 39.438v3.124c0 .518.42.938.938.938h3.958c.518 0 .937-.42.937-.938v-3.124c0-.518-.42-.938-.937-.938h-3.958c-.518 0-.938.42-.938.938zm15.104-2.188h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.937.42-.937.938v3.124c0 .518.42.938.937.938zm0 6.25h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.937.42-.937.938v3.124c0 .518.42.938.937.938zm-8.02-4.063v3.126c0 .517.419.937.937.937h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.938.42-.938.938z" transform="translate(-1135 -26)" />
                    </g>
                  </g>
                </svg></i>
                <div className="dropdown-menu advertiser-dropdown-menu">
                  <ul className="list-group advertiser">
                    <li className="list-group-item">
                      <div className="search-advitiser">
                        <input type="text" name="search" className="form-control" placeholder="Search advertiser by name…" onChange={(e) => handleSearchAdvertisers(e.target.value)}/>
                        <button type="submit">
                          {
                            isSearching
                              ? <div className="spinner-grow spinner-grow-sm" role="status"> <span className="sr-only">Loading...</span></div>
                              : <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16">
                                <g fill="#505050" fillRule="nonzero">
                                  <path d="M1381.722 105.187l-2.87-2.87c1.07-1.2 1.735-2.788 1.735-4.523 0-3.746-3.048-6.794-6.793-6.794-3.746 0-6.794 3.048-6.794 6.794 0 3.745 3.048 6.793 6.794 6.793 1.33 0 2.561-.389 3.6-1.037l2.983 2.983c.178.178.421.276.664.276.244 0 .487-.098.665-.276.39-.373.39-.973.016-1.346zm-12.825-7.393c0-2.692 2.189-4.897 4.897-4.897 2.707 0 4.88 2.205 4.88 4.897 0 2.691-2.189 4.896-4.88 4.896-2.692 0-4.897-2.189-4.897-4.896z" transform="translate(-1367 -91)" />
                                </g>
                              </svg>
                          }
                        </button>
                      </div>
                    </li>
                    {avaliableUsers.map(advertiser =>  (<li key={advertiser.id} className="list-group-item">
                      <div className="row">
                        <div className="col-6 text-left">{advertiser.name}</div>
                        <div className="col-6 text-right"><button onClick={() => setUser({permissions: user.permissions, ...advertiser})} className="btn btn-primary btn-sm">Login</button></div>
                      </div>
                    </li>))}
                  </ul>
                </div>
              </li>
              : ''
          }
          <li>
            <i className="icon icon-notification" />
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
                <h6 className="mt-0">{user ? user.name : 'Guest'}</h6>
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
