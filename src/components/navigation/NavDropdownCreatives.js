import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';

// Services
import CampaignService from '../../services/campaign.service';

const NavDropdownCreatives = ({campaignNavItems}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCampaign, setcurrentCampaign] = useState('');
  const [topCreatives, setTopCreatives] = useState([]);
  const history = useHistory();

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
  const loadTopFiveCreativesData = (campaignId) => {
    setIsLoading(true);
    CampaignService.getCampaignPerformanceAssets(campaignId, {startDate: start, endDate: end, top: 4})
      .then((response) => {
        setTopCreatives(response.data.summary);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));

    setcurrentCampaign(campaignId);
  };

  const loadNavTopCreatives = (creatives) => {
    return creatives.length
      ? creatives.map(creative => {
        return (<li className="col" key={creative.campaignAssetId}>
          <div className="card card-menu-creative">
            <div className="card-creative-thumb">
              <span className="badge badge-secondary">{calculateAssetDimensional(creative.params.url)}</span>
              {
                creative.params.name && creative.params.name.endsWith('mp4')
                  ? <video controls preload="none">
                    <source src={creative.params.url} type="video/mp4"/>
                      Your browser does not support the video tag.
                  </video>
                  : <object data={creative.params.url} />
              }
            </div>
            <div className="card-body">
              <h5>{(creative.params.name) ? creative.params.name : 'No Data' }</h5>
            </div>
          </div>
        </li>);
      })
      : <div className="col">No Creative found</div>;
  };

  const calculateAssetDimensional = (asset) => {
    const img = new Image();
    img.src = asset;
    img.onload;
    return (img.width + '*' + img.height);
  };

  useEffect(() => {
    campaignNavItems.length && loadTopFiveCreativesData(campaignNavItems[0].id);
  }, [campaignNavItems.length]);

  return (
    <div className="dropdown-full-width">
      <div className="container">
        <div className="row w-100">
          <div className="col-md-2 br">
            <ul className="nav flex-column">
              {
                campaignNavItems.slice(0, 5).map((item) => {
                  return (<li className="nav-item" key={item.id}>
                    <Link to="#"
                      className={'nav-link ' + ((currentCampaign === item.id) ? 'text-primary' : '')}
                      onClick={() => loadTopFiveCreativesData(item.id)}>{item.name}
                    </Link>
                  </li>);
                })
              }
            </ul>
          </div>
          <div className="col-md-10 pt-4">
            <div className="pl-3 creatives-overview">
              <div className="overview-title">
                <h5>Top 5 Creatives
                  <NavDropdown.Item className="btn-link" onClick={() => history.push('/dashboard/creatives')}>See All Creatives</NavDropdown.Item>
                </h5>
              </div>
              <ul className="row overview-detail">
                {
                  isLoading
                    ? <div className="col text-center m-5">
                      <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                    </div>
                    : loadNavTopCreatives(topCreatives)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavDropdownCreatives.propTypes = {
  campaignNavItems: PropTypes.array,
};

export default NavDropdownCreatives;
