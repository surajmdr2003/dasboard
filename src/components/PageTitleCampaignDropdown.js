import React, { useEffect, useState } from "react";

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
    const campaignNavItemsOfStatus = props.campaignList.filter(item => item.status === status);

    setCampaignNavItemsOfStatus(campaignNavItemsOfStatus);
    setcurrentCampaignCat(status);
  };


  const loadCampaignListForPageFilter = (campaignsOfStatus) => {
    return campaignsOfStatus.length
      ? campaignsOfStatus.map((item) => {
        return (<li className="nav-item" key={item.id} onClick={() => loadCampaignSummaryData(item.id)}>
          {item.name}
        </li>);
      })
      : <li className="nav-item">No Campaign</li>
  }

  useEffect(() => {
    setCampaignNav(currentCampaignCat);
  }, [])

  return (
    <div className="campaigns-link">
      Creatives - <a href="#" className="btn-breadcrumb">Go! checking OU</a>
      <div className="campaign-dropdown-menu dropdown-menu">
        <div className="card-header">
          <div className="active" onClick={() => setCampaignNav('ACTIVE')}>Active campaigns</div>
          <div onClick={() => setCampaignNav('INACTIVE')}>Inactive campaigns</div>
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

export default PageTitleCampaignDropdown;
