import React from 'react';

const TopCreativeAdsBlock = () => {
    return (
        <div className="col-lg-3 col-sm-6">
            <div className="card card-creative">
                <div className="card-creative-thumb">
                    <span className="badge badge-secondary">1200*462</span>
                    <img src="./assets/images/creative-thumb.png" alt="creative thumb" />
                </div>
                <div className="card-body">
                    <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                    <ul>
                        <li><strong>Impressions</strong>12,093</li>
                        <li><strong>Clicks</strong>92</li>
                        <li><strong>CTR</strong>5.4%</li>
                        <li><strong>Conversion</strong>31</li>
                        <li><strong>Conv rate</strong>0.5%</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TopCreativeAdsBlock;