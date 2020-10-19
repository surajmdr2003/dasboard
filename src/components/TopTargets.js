import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// Services
import TargetService from '../services/target.service';

// Components
import MapComponent from './MapComponent';

const TopTargets = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [targets, setTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    TargetService.getCampaignTargets(props.campaignId)
      .then((response) => {
        setTargets(response.data);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  }, [props.campaignId]);

  return (
    <section className="target-location-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top Targets
            </div>
          </div>
        </div>
        <div className="card card-map">
          <div className="row location-container">
            {
              isLoading
                ? <div className="col text-center m-5">
                  <center><div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div></center>
                </div>
                : <Fragment>
                  <div className="locations col-sm-3 pr-0">
                    <div className="card border-0">
                      <div className="card-header">
                        Target Locations
                      </div>
                      <ul className="list-group list-group-flush">
                        {
                          targets.length
                            ? targets.map(target => <li key={target.id} style={{ cursor: 'pointer' }} className="list-group-item" onClick={(e) => { e.preventDefault(); setSelectedTarget(target); }}>{target.name}</li>)
                            : <li className="list-group-item">No Location</li>
                        }
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-9 pl-0">
                    <MapComponent target={selectedTarget ? selectedTarget : null} />
                  </div>
                </Fragment>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

TopTargets.propTypes = {
  campaignId: PropTypes.any,
};

export default TopTargets;
