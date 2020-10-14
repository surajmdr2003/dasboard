import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

const NavDropdownCampaign = (props) => {
  const initSummary = {
    clicks: 0,
    conversions: [],
    impressions: 0,
    name: null,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [currentCampaignCat, setcurrentCampaignCat] = useState('ACTIVE');
  const [currentCampaign, setcurrentCampaign] = useState(256);
  const [campaignNavItemsOfStatus, setCampaignNavItemsOfStatus] = useState([]);
  const [navCampaignSummary, setNavCampaignSummary] = useState(initSummary);

  /**
   * Filter Campaign Nav items
   * By ACTIVE and INACTIVE status
   * Load Campaign summary data for nav
   * @param {String} status
   */
  const setCampaignNav = (status) => {
    const campaignNavItemsOfStatus = props.campaignNavItems.filter(item => item.status === status);

    setCampaignNavItemsOfStatus(campaignNavItemsOfStatus.slice(0, 5));
    setcurrentCampaignCat(status);

    campaignNavItemsOfStatus.length
     ? loadCampaignSummaryData(campaignNavItemsOfStatus[0].id)
     : '';
  };

  /**
   * For Initial startdate and enddate for 7 Days
   */
  const now = new Date();
  const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
  const start = moment(start).subtract(7, 'days').format('YYYY-MM-DD');

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  /**
   * Load Campaign Summary data for menu
   * @param {Int} campaignId
   */
  const loadCampaignSummaryData = (campaignId) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function (info) {
        const accessToken = info.getAccessToken().getJwtToken();
        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: start,
          endDate: end,
        });

        const response = await API.post('canpaignGroup', `/${campaignId}/performance`, apiRequest);
        response.data.summary.length ? setNavCampaignSummary(response.data.summary[0]) : setNavCampaignSummary(initSummary);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));

    setcurrentCampaign(campaignId);
  };

  useEffect(() => {
    setCampaignNav(currentCampaignCat);
  }, []);

  /**
   * Canclates CTR Properly
   * @param {Object} param
   */
  const calculateCTR = ({ clicks, impressions }) => {
    return ((clicks === 0 && impressions === 0) ? 0 : ((clicks / impressions) * 100)).toFixed(2);
  };

  /**
   * Calculates Conversion Rate Properly
   * @param {Object} param
   */
  const calculateConvRate = ({ conversions, clicks }) => {
    return ((conversions.length === 0 && clicks === 0) ? 0 : ((conversions.length / clicks) * 100)).toFixed(2);
  };
  
  const loadCampaignListForNav = (campaignsOfStatus) => {
    return campaignsOfStatus.length
    ? campaignsOfStatus.map((item) => {
      return (<li className="nav-item" key={item.id}>
        <Link to="#"
          className={'nav-link ' + ((currentCampaign === item.id) ? 'text-primary' : '')}
          onClick={() => loadCampaignSummaryData(item.id)}>{item.name}
        </Link>
      </li>);
      })
    : <li className="nav-item"><Link to="#" className="nav-link">No Campaign</Link></li>
  }

  return (
    <div className="dropdown-full-width">
      <div className="container">
        <div className="row w-100">
          <div className="col-sm-2 br">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="#"
                  onClick={() => setCampaignNav('ACTIVE')}
                  className={'nav-link ' + ((currentCampaignCat === 'ACTIVE') ? 'text-primary' : '')}
                >Active</Link>
              </li>
              <li className="nav-item">
                <Link to="#"
                  onClick={() => setCampaignNav('INACTIVE')}
                  className={'nav-link ' + ((currentCampaignCat === 'INACTIVE') ? 'text-primary' : '')}
                >Inactive</Link>
              </li>
              <li className="nav-item">
                <Link to="/campaign/256" className="nav-link btn-link">See All Campaigns</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-2 br">
            <ul className="nav flex-column">
              { loadCampaignListForNav(campaignNavItemsOfStatus) }
            </ul>
          </div>
          <div className="col-sm-8 pt-4">
            <div className="pl-3 campaign-overview">
              {
                isLoading
                  ? <div className="text-center m-5">
                    <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                  </div>
                  : <Fragment>
                    <div className="overview-title">
                      <h5>Overview of {(props.campaignNavItems.length) ? props.campaignNavItems[0].name : ''}</h5>
                      <p>Last 7 days</p>
                    </div>
                    <ul className="nav nav-pills nav-fill overview-detail">
                      <li className="nav-item">
                        <div className="number">{navCampaignSummary.impressions}</div>
                        <div className="title">Impressions</div>
                      </li>
                      <li className="nav-item active">
                        <div className="number">{navCampaignSummary.clicks}</div>
                        <div className="title">Clicks</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{calculateCTR(navCampaignSummary)}%</div>
                        <div className="title">CTR</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{navCampaignSummary.conversions.length}</div>
                        <div className="title">Conversion</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{calculateConvRate(navCampaignSummary)}%</div>
                        <div className="title">Conv rate</div>
                      </li>
                    </ul>
                    <Link to="#" className="btn-link">View Performance</Link>
                  </Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavDropdownCampaign.propTypes = {
  campaignNavItems: PropTypes.array,
};

export default NavDropdownCampaign;
