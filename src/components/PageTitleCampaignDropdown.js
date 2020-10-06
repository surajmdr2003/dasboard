import React from 'react';

const PageTitleCampaignDropdown = () => {
  return (
    <div className="campaigns-link">
            Creatives - <a href="#" className="btn-breadcrumb">Go! checking OU</a>
      <div className="campaign-dropdown-menu dropdown-menu">
        <div className="card-header">
          <div className="active">Active campaigns</div>
          <div>Inactive campaigns</div>
        </div>
        <div className="card-body p-0">
          <ul className="campaign-list">
            <li>Go Checking OSU!</li>
            <li>MFB Fall Checking 2020 - RAF AZ</li>
            <li>MFB Fall Checking 2020 - RAF AZ</li>
            <li>MFB Fall Checking 2020 - RAF AZ</li>
            <li>MFB Fall Checking 2020 - RAF AZ</li>
            <li>MFB Fall Checking 2020 - RAF AZ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageTitleCampaignDropdown;
