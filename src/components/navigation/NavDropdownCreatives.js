import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

const NavDropdownCreatives = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCampaign, setcurrentCampaign] = useState(75);
  const [topCreatives, setTopCreatives] = useState([]);

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
  const loadTopFiveCreativesData = (campaignId) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();
        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: start,
          endDate: end,
        });

        const response = await API.post('canpaignGroup', `/${campaignId}/performance/asset`, apiRequest);
        setTopCreatives(response.data.summary.slice(0, 5));
        setIsLoading(false);
      })
      .catch(() => false);

    setcurrentCampaign(campaignId);
  };

  const loadNavTopCreatives = (creatives) => {
    return creatives.length
      ? creatives.map(creative => {
        return (<li className="col" key={creative.campaignAssetId}>
          <div className="card card-menu-creative">
            <div className="card-creative-thumb">
              <span className="badge badge-secondary">{calculateAssetDimensional(creative.assetUrl)}</span>
              <object data={creative.assetUrl} />
            </div>
            <div className="card-body">
              <h5>{(creative.name === null || creative.name === '') ? 'No Data' : creative.name}</h5>
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
    (props.campaignNavItems.length)
      ? loadTopFiveCreativesData(props.campaignNavItems[0].id)
      : '';
  }, []);

  return (
    <div className="dropdown-full-width">
      <div className="container">
        <div className="row w-100">
          <div className="col-md-2 br">
            <ul className="nav flex-column">
              {
                props.campaignNavItems.slice(0, 5).map((item) => {
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
                  <Link to="#" className="btn-link">See All Campaigns</Link>
                </h5>
              </div>
              <ul className="row overview-detail">
                {
                  isLoading
                    ? <div className="text-center m-5">
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
