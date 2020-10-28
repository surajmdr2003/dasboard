import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

// Context
import GlobalContext from '../context/GlobalContext';

const PageTitleCampaignDropdown = (props) => {
  const {setActiveCampaign} = React.useContext(GlobalContext);
  const [campaignList, setCampaignList] = useState(props.campaignList || []);
  const [currentCampaignCat, setcurrentCampaignCat] = useState('ACTIVE');

  useEffect(() => {
    initialize();

    return () => {
      PubSub.clearAllSubscriptions();
    };
  }, []);

  const initialize = () => {
    // Initialize Subscribers
    PubSub.subscribe('CAMPAIGNS:LOADED', (event, updatedCampaigns) => {
      event === 'CAMPAIGNS:LOADED' && updateCampaignsList(updatedCampaigns);
    });
  };

  /**
   * Update loaded Campaigns
   * @param {[Object]} campaigns
   */
  const updateCampaignsList = campaigns => {
    setCampaignList(campaigns);
  };

  /**
   * Filter Campaign Nav items
   * By ACTIVE and INACTIVE status
   * Load Campaign summary data for nav
   * @param {String} status
   */
  const setCampaignNav = (status) => {
    setcurrentCampaignCat(status);
  };

  /**
   * Returns view of Campiagns list for breadcrumb
   * @param {Array} campaignsOfStatus
   */
  const loadCampaignListForPageFilter = (status) => {
    const campaignsOfStatus = campaignList.filter(item => item.status === status);

    return campaignsOfStatus.length
      ? campaignsOfStatus.map((item) => {
        return (<li className="nav-item" key={item.id}>
          <Link onClick={() => setActiveCampaign(item)} to={`${props.pageSlug}`} className={parseInt(props.campaignId, 10) === item.id ? 'text-primary' : ''}>{item.name}</Link>
        </li>);
      })
      : <li className="nav-item no-campaign">No Campaign</li>;
  };

  /**
   * Returns currnet campaign name
   * @param {Int} campaignId
   */
  const showCurrentCampaign = (campaignId) => {
    const currentCampaign =  campaignList.find(item => item.id === parseInt(campaignId, 10));
    return currentCampaign ? currentCampaign.name : '';
  };

  useEffect(() => {
    setCampaignNav(currentCampaignCat);
  }, []);

  return (
    <Fragment>
      {
        campaignList.length
          ? <div className="campaigns-link">
              Landing Pages - <a href="#" className="btn-breadcrumb">{showCurrentCampaign(props.campaignId)}</a>
            <div className="campaign-dropdown-menu dropdown-menu">
              <div className="card-header">
                <div className={(currentCampaignCat === 'ACTIVE' ? 'active' : '')} onClick={() => setCampaignNav('ACTIVE')}>Active campaigns</div>
                <div className={(currentCampaignCat === 'INACTIVE' ? 'active' : '')} onClick={() => setCampaignNav('INACTIVE')}>Inactive campaigns</div>
              </div>
              <div className="card-body p-0">
                <ul className="campaign-list">
                  {loadCampaignListForPageFilter(currentCampaignCat)}
                </ul>
              </div>
            </div>
          </div>
          : ''
      }
    </Fragment>

  );
};

PageTitleCampaignDropdown.propTypes = {
  pageSlug: PropTypes.string,
  campaignId: PropTypes.any,
  campaignList: PropTypes.array,
};

export default PageTitleCampaignDropdown;
