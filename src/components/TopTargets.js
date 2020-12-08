import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// Services
import TargetService from '../services/target.service';

// Components
import MapComponent from './MapComponent';

const TopTargets = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [targetInfo, setTargetInfo] = useState({
    selectedTarget: null,
    allTargets: [],
  });

  /**
   * Loads Targets for given Campaign
   * @param {*} campaignId
   */
  const getCampaignTargets = (campaignId) => {
    setIsLoading(true);
    TargetService.getCampaignTargets(campaignId)
      .then((response) => {
        setTargetInfo({
          selectedTarget: (response.data && response.data.length ? response.data[0] : null),
          allTargets: response.data,
        });
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (props.campaignId) {
      getCampaignTargets(props.campaignId);
    } else {
      setTargetInfo({
        selectedTarget: null,
        allTargets: [],
      });
    }
  }, [props.campaignId]);

  return (
    <section className="target-location-content">
      <div className="container">
        {
          (props.showBlockTitle)
            ? <div className="row align-items-center filter-block">
              <div className="col-md-5">
                <div className="block-title">
                  Top Targets
                </div>
              </div>
            </div>
            : ''
        }
        <div className="card card-map">
          <div className="row location-container">
            {
              isLoading
                ? <div className="col text-center m-5">
                  <center><div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div></center>
                </div>
                : props.campaignId
                  ? <Fragment>
                    <div className="locations col-sm-3 pr-0">
                      <div className="card border-0">
                        <div className="card-header">
                          Target Locations
                        </div>
                        <ul className="list-group list-group-flush">
                          {
                            targetInfo.allTargets.length
                              ? targetInfo.allTargets.map(target => {
                                return (
                                  <li key={target.id} style={{ cursor: 'pointer' }}
                                    className={'list-group-item ' + (targetInfo.selectedTarget && targetInfo.selectedTarget.id === target.id ? 'active' : '')}
                                    onClick={(e) => { e.preventDefault(); setTargetInfo({ ...targetInfo, selectedTarget: target }); }}>
                                    {target.name}
                                  </li>
                                );
                              })
                              : <li className="list-group-item">No Location</li>
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-9 pl-0">
                      <MapComponent target={targetInfo.selectedTarget} />
                    </div>
                  </Fragment>
                  : <div className="col m-5 text-center">
                    <p className="text-md">No Available Targets!</p>
                  </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

TopTargets.propTypes = {
  campaignId: PropTypes.any,
  showBlockTitle: PropTypes.bool,
};

export default TopTargets;
