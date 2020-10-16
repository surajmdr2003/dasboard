import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PageTitleCampaignDropdown = (props) => {
  const [currentCampaignCat, setcurrentCampaignCat] = useState('ACTIVE');
  const [campaignNavItemsOfStatus, setCampaignNavItemsOfStatus] = useState([]);

  /**
 * Filter Campaign Nav items
 * By ACTIVE and INACTIVE status
 * Load Campaign summary data for nav
 * @param {String} status
 */
  const setCampaignNav = (status) => {
    const campaignNavItemsWithStatus = props.campaignList.filter(item => item.status === status);
    setCampaignNavItemsOfStatus(campaignNavItemsWithStatus);
    setcurrentCampaignCat(status);
  };


  /**
   * Returns view of Campiagns list for breadcrumb
   * @param {Array} campaignsOfStatus
   */
  const loadCampaignListForPageFilter = (campaignsOfStatus) => {
    return campaignsOfStatus.length
      ? campaignsOfStatus.map((item) => {
        return (<li className="nav-item" key={item.id}>
          <Link to={`${props.pageSlug}/${item.id}`} className={parseInt(props.campaignId, 10) === item.id ? 'text-primary' : ''}>{item.name}</Link>
        </li>);
      })
      : <li className="nav-item no-campaign">No Campaign</li>;
  };

  /**
   * Returns currnet campaign name
   * @param {Int} campaignId
   */
  const showCurrentCampaign = (campaignId) => {
    const currentCampaign =  props.campaignList.find(item => item.id === parseInt(campaignId, 10));
    return currentCampaign.name;
  };

  useEffect(() => {
    setCampaignNav(currentCampaignCat);
  }, []);

  return (
    <div className="campaigns-link">
      Landing Pages - <a href="#" className="btn-breadcrumb">{showCurrentCampaign(props.campaignId)}</a>
      <div className="campaign-dropdown-menu dropdown-menu">
        <div className="card-header">
          <div className={(currentCampaignCat === 'ACTIVE' ? 'active' : '')} onClick={() => setCampaignNav('ACTIVE')}>Active campaigns</div>
          <div className={(currentCampaignCat === 'INACTIVE' ? 'active' : '')} onClick={() => setCampaignNav('INACTIVE')}>Inactive campaigns</div>
        </div>
        <div className="card-body p-0">
          <ul className="campaign-list">
            {loadCampaignListForPageFilter(campaignNavItemsOfStatus)}
          </ul>
        </div>
      </div>
    </div>
  );
};

PageTitleCampaignDropdown.propTypes = {
  pageSlug: PropTypes.string,
  campaignId: PropTypes.string,
  campaignList: PropTypes.array,
};

export default PageTitleCampaignDropdown;
