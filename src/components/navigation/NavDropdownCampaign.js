import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';

// Context
import GlobalContext from '../../context/GlobalContext';

// Services
import CampaignService from '../../services/campaign.service';

const NavDropdownCampaign = ({campaignNavItems}) => {
  const initSummary = {
    id: '',
    name: '',
    clicks: 0,
    conversions: [],
    impressions: 0,
    params: {
      endDate: '',
      name: '',
      startDate: '',
      status: '',
      url: null,
    },
  };
  const {activeCampaign, setActiveCampaign} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCampaignCat, setCurrentCampaignCat] = useState('');
  const [currentCampaign, setCurrentCampaign] = useState('');
  const [navCampaignSummary, setNavCampaignSummary] = useState(initSummary);
  const history = useHistory();

  /**
   * Filter Campaign Nav items
   * By ACTIVE and INACTIVE status
   * Load Campaign summary data for nav
   * @param {String} status
   */
  const setCampaignNav = (status) => {
    setCurrentCampaignCat(status);
  };

  /**
   * For Initial startdate and enddate for 7 Days
   */
  const now = new Date();
  const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
  const start = moment(start).subtract(7, 'days').format('YYYY-MM-DD');

  /**
   * Load Campaign Summary data for menu
   * @param {Int} campaignId
   */
  const loadCampaignSummaryData = (campaignId) => {
    setIsLoading(true);
    CampaignService.getCampaignPerformance(campaignId, {startDate: start, endDate: end, top: 5})
      .then((response) => {
        setNavCampaignSummary(response.data.summary.length ? response.data.summary[0] : {...initSummary, id: campaignId});
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));

    setCurrentCampaign(campaignId);
  };

  useEffect(() => {
    if (campaignNavItems.length) {
      if (campaignNavItems.some(item => item.status === 'ACTIVE')) {
        setCampaignNav('ACTIVE');
      } else if (campaignNavItems.some(item => item.status === 'INACTIVE')) {
        setCampaignNav('INACTIVE');
      }

      loadCampaignSummaryData(campaignNavItems[0].id);
    } else {
      setNavCampaignSummary(initSummary);
    }
  }, [activeCampaign.id, campaignNavItems.length]);

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
    return ((conversions.length === 0 && clicks === 0) ? 0 : ((conversions.reduce((sum, next) => sum + next.count, 0) / clicks) * 100)).toFixed(2);
  };

  const loadCampaignListForNav = (status) => {
    const campaignsOfStatus = campaignNavItems.filter(item => item.status === status).slice(0, 5);

    return campaignsOfStatus.length
      ? campaignsOfStatus.map((item) => {
        return (<li className="nav-item" key={item.id}>
          <Link to="#"
            className={'nav-link ' + ((currentCampaign === item.id) ? 'text-primary' : '')}
            onClick={() => loadCampaignSummaryData(item.id)}>{item.name}
          </Link>
        </li>);
      })
      : <li className="nav-item"><Link to="#" className="nav-link">No Campaigns</Link></li>;
  };

  const loadCampaignPage = () => {
    history.push('/dashboard/campaign');
    setActiveCampaign({id: navCampaignSummary.id || activeCampaign.id});
  };

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
                <NavDropdown.Item className="nav-link btn-link" onClick={() => history.push('/dashboard/campaigns')}>See All Campaigns</NavDropdown.Item>
              </li>
            </ul>
          </div>
          <div className="col-sm-2 br">
            <ul className="nav flex-column">
              { loadCampaignListForNav(currentCampaignCat) }
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
                      <h5>Overview of {(navCampaignSummary && navCampaignSummary.params.name) ? navCampaignSummary.params.name : 'N/A'}</h5>
                      <p>Last 7 days</p>
                    </div>
                    <ul className="nav nav-pills nav-fill overview-detail">
                      <li className="nav-item">
                        <div className="number">{navCampaignSummary.impressions.toLocaleString()}</div>
                        <div className="title">Impressions</div>
                      </li>
                      <li className="nav-item active">
                        <div className="number">{navCampaignSummary.clicks.toLocaleString()}</div>
                        <div className="title">Clicks</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{calculateCTR(navCampaignSummary)}%</div>
                        <div className="title">CTR</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{navCampaignSummary.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</div>
                        <div className="title">Conversion</div>
                      </li>
                      <li className="nav-item">
                        <div className="number">{calculateConvRate(navCampaignSummary)}%</div>
                        <div className="title">Conv. rate</div>
                      </li>
                    </ul>
                    <NavDropdown.Item className="btn-link" onClick={() => loadCampaignPage()}>View Performance</NavDropdown.Item>
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
