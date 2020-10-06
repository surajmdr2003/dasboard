import React from 'react';

const TopTargets = () => {
  return (
    <section className="target-location-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
                            Top Creatives
              <a href="#" className="btn-link">See All</a>
            </div>
          </div>
          <div className="col-md-7 text-right">
            <button type="button" className="btn btn-outline-primary btn-date-picker">Last 30 days</button>
          </div>
        </div>

        <div className="card card-map">
          <div className="row location-container">
            <div className="locations col-sm-3 pr-0">
              <div className="card border-0">
                <div className="card-header">
                                    Target Locations
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                  <li className="list-group-item">Hawthrone</li>
                  <li className="list-group-item">Manhattan Beach</li>
                  <li className="list-group-item">Hermosa Beach</li>
                  <li className="list-group-item">Torrace</li>
                  <li className="list-group-item">Rolling Hills Estates</li>
                </ul>
              </div>
            </div>
            <div className="map col-sm-9 pl-0">
              <img src="/assets/images/map.png" alt="map" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTargets;
