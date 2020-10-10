import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

const NavDropdownCreatives = (props) => {
  const [currentCampaign, setcurrentCampaign] = useState(75);
  const [topCreatives, setTopCreatives] = useState([{
    id: 1,
    clicks: 0,
    impressions: 0,
  }]);

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
      })
      .catch(() => false);

    setcurrentCampaign(campaignId);
  };


  useEffect(() => {
    loadTopFiveCreativesData(props.campaignNavItems[0].id);
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
                  topCreatives.map((creative, i)=> {
                    return (<li className="col" key={i}>
                      <div className="card card-menu-creative">
                        <div className="card-creative-thumb">
                          <span className="badge badge-secondary">1200*462</span>
                          <img src="/assets/images/ads-1.png" alt="creative thumb" />
                        </div>
                        <div className="card-body">
                          <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                        </div>
                      </div>
                    </li>);
                  })
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
