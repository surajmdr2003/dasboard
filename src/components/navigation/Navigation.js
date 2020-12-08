import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

// Third party
import PubSub from 'pubsub-js';
import debounce from 'lodash/debounce';
import { Auth } from 'aws-amplify';

// Context
import GlobalContext from '../../context/GlobalContext';

// Utilities
import Storage from '../../utilities/Storage';

// Components
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
// import NavDropdownCampaign from './NavDropdownCampaign';
// import NavDropdownCreatives from './NavDropdownCreatives';
import NotificationList from '../NotificationList';

// Services
import AdvertiserService from '../../services/advertiser.service';

const Navigation = () => {
  const { user, setUser, setActiveCampaign } = React.useContext(GlobalContext);
  // const [campaignList, setCampaignList] = useState(window.$campaigns);
  const [avaliableUsers, setAvailableUsers] = useState([]);
  const [isSearching, setIsSearcing] = useState(false);
  const [isOpen, toggleNavDropdown] = useState(false);
  const initCampaigns = { id: null, name: 'No Campaign Found' };
  const history = useHistory();

  const loadCampaignsData = () => {
    if (user && user.id === null) {
      return console.log('No Active user selected!');
    }

    return AdvertiserService.getAdvertiserCampaignGroups(user.id)
      .then((response) => {
        window.$campaigns = response.data.length ? response.data : [];
        PubSub.publish('CAMPAIGNS:LOADED', response.data);
        setActiveCampaign(response.data.length ? response.data[0] : initCampaigns);
        setCampaignList(response.data);
      })
      .catch(() => console.log('No campaigns available for user: '));
  };

  /**
   * Check User Permission for user switch
   */
  const checkPermission = () => {
    return user ? user.permissions.includes('ROLE_USER') && user.permissions.includes('ROLE_ADMIN') : false;
  };

  // Debouncing the change event
  const handleSearchAdvertisers = debounce(query => searchAdvertisers(query), 500);

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

  /**
   * Update current User in Global Context and localStorage
   * @param {*} switchedUser
   */
  const updateUser = async(switchedUser) => {
    const userInfo = await AdvertiserService.getAdvertiserProfile(switchedUser.id);
    Storage.setItem('current:user', btoa(JSON.stringify({ ...user, ...userInfo.data })));
    setUser({ ...user, ...userInfo.data });
  };

  /**
   * Signout Current Logged In User
   */
  const signOut = (event) => {
    event.preventDefault();
    Storage.removeItem('current:user');
    cogoToast.success('You are signed out successsfully!', {position: 'bottom-center'});
    Auth.signOut();
  };

  useEffect(() => {
    loadCampaignsData();
  }, [user.id]);

  return (
    <Fragment>
      <button className="navbar-toggler" onClick={() => toggleNavDropdown(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -53 384 384">
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto primary-navigation">
          <li><NavLink activeClassName={'active'} exact={true} to="/dashboard">Dashboard</NavLink></li>
          {/* <NavDropdown title="Campaigns" className="fullwidth-nav">
            <NavDropdownCampaign campaignNavItems={campaignList} />
          </NavDropdown>
          <NavDropdown title="Creatives" className="fullwidth-nav">
            <NavDropdownCreatives campaignNavItems={[...campaignList]}/>
          </NavDropdown> */}
          <li><NavLink to="/dashboard/campaigns">Campaigns</NavLink></li>
          <li><NavLink to="/dashboard/creatives">Creatives</NavLink></li>
          <li><NavLink to="/dashboard/landing-pages">Landing pages</NavLink></li>
          <li><NavLink to="/dashboard/targeting">Targeting</NavLink></li>
          {/* <li><NavLink to="/dashboard/stats">Stats</NavLink></li> */}
          <li><NavLink to="/dashboard/reports">Reports</NavLink></li>
        </ul>
        <ul className="navbar-nav align-items-center secondary-menu">
          {
            checkPermission()
              ? <li><Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <i className="icon icon-advertiser">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" >
                      <g fill="none" fillRule="evenodd">
                        <g fill="#A0A0A0" fillRule="nonzero">
                          <path d="M1140.833 26.938v3.125c0 .517-.42.937-.937.937h-3.958c-.518 0-.938-.42-.938-.938v-3.125c0-.517.42-.937.938-.937h3.958c.518 0 .937.42.937.938zm7.084 9.375v-3.126c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.938.42-.938.938v3.124c0 .518.42.938.938.938h3.958c.518 0 .938-.42.938-.938zm1.25-9.376v3.125c0 .518.42.938.937.938h3.958c.518 0 .938-.42.938-.938v-3.125c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.937.42-.937.938zm-1.25 3.125v-3.125c0-.517-.42-.937-.938-.937h-3.958c-.518 0-.938.42-.938.938v3.125c0 .517.42.937.938.937h3.958c.518 0 .938-.42.938-.938zm-8.021 2.188h-3.958c-.518 0-.938.42-.938.938v3.124c0 .518.42.938.938.938h3.958c.518 0 .937-.42.937-.938v-3.124c0-.518-.42-.938-.937-.938zM1135 39.438v3.124c0 .518.42.938.938.938h3.958c.518 0 .937-.42.937-.938v-3.124c0-.518-.42-.938-.937-.938h-3.958c-.518 0-.938.42-.938.938zm15.104-2.188h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.937.42-.937.938v3.124c0 .518.42.938.937.938zm0 6.25h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.937.42-.937.938v3.124c0 .518.42.938.937.938zm-8.02-4.063v3.126c0 .517.419.937.937.937h3.958c.518 0 .938-.42.938-.938v-3.124c0-.518-.42-.938-.938-.938h-3.958c-.518 0-.938.42-.938.938z" transform="translate(-1135 -26)" />
                        </g>
                      </g>
                    </svg>
                  </i>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight="right">
                  <div className={'advertiser-dropdown-menu'}>
                    <ul className="list-group advertiser">
                      <li className="list-group-item">
                        <div className="search-advitiser">
                          <input type="text" name="search" className="form-control" placeholder="Search advertiser by name…" onChange={(e) => handleSearchAdvertisers(e.target.value)} />
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
                      {avaliableUsers.map(advertiser =>
                        (<Dropdown.Item key={advertiser.id}
                          className={'list-group-item' + (user.id === advertiser.id ? ' active' : '')}
                          onClick={() => showDropdown()} style={{ 'cursor': 'pointer' }}
                          onClick={() => updateUser(advertiser)}>
                          {advertiser.name}
                        </Dropdown.Item>))}
                    </ul>
                  </div>
                </Dropdown.Menu>
              </Dropdown></li>
              : ''
          }
          <li>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-notification">
                <i className="icon icon-notification" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight="right">
                <div className="notification-dropdown-menu">
                  <div className="notification-header">
                    Notifications <Dropdown.Item onClick={() => history.push('/dashboard/notifications')} className="btn-link">See All</Dropdown.Item>
                  </div>
                  <ul className="notifications list-unstyled">
                    <NotificationList displaySummary={true} />
                  </ul>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <div className="menu-profile media">
                  <img src={(user.icon ? user.icon : '/assets/images/avatar.svg')}
                    className="profile-icon align-self-center mr-3"
                    alt={user.name}
                  />
                  <div className="media-body align-self-center">
                    <span style={{'maxWidth': '120px'}} className="user-name mt-0">{user ? user.name : 'Guest'}</span>
                    <span className="mt-0 dropdown-icon">&nbsp;</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight="right" className="profile-dropdown-menu">
                <Dropdown.Item onClick={() => history.push('/dashboard/profile')}>Profile</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => history.push('#')}>Payment setting</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => history.push('/dashboard/billing')}>Billing history</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => history.push('#')}>Contact us</Dropdown.Item> */}
                <Dropdown.Item onClick={(e) => signOut(e)}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navigation;
