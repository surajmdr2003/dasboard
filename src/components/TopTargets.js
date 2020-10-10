import React, { Fragment, useEffect, useState } from 'react';
import { Auth, API } from 'aws-amplify';
import MapComponent from './MapComponent';

const TopTargets = () => {
  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };
  const [isLoading, setIsLoading] = useState(false);
  const [targets, setTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;
        const response = await API.post('canpaignGroupTargeting', '', apiRequest);

        // Updating the response to the state
        setTargets(response.data);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <section className="target-location-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top Targets
              <a href="#" className="btn-link">See All</a>
            </div>
          </div>
          <div className="col-md-7 text-right">
            <button type="button" className="btn btn-outline-primary btn-date-picker">Last 30 days</button>
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
                          { targets.map(target => <li key={target.id}  style={{cursor: 'pointer'}} className="list-group-item" onClick={(e) => {e.preventDefault(); setSelectedTarget(target)}}>{target.name}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-9 pl-0">
                      <MapComponent target={selectedTarget ? selectedTarget : {data: null}}/>
                    </div>
                  </Fragment>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTargets;
