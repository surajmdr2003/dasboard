import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Fragment } from 'react';

const TopCreativeAdsBlock = ({ creative }) => {
  const [creativeOnModal, setCreativeOnModal] = useState({
    params: {
      name: '',
      url: '',
    },
  });
  /**
   * Handle NAN and Infinity value
   * @param {Int} fNum
   * @param {Int} sNum
   */
  const handleNanValueWithCalculation = (fNum, sNum) => {
    if (sNum === 0) {
      return (fNum * 100).toFixed(2);
    }
    return ((fNum / sNum) * 100).toFixed(2);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setCreativeOnModal(data);
  };

  return (
    <Fragment>
      <div className="p-2">
        <div className="card card-creative">
          <div className="card-creative-thumb" onClick={() => handleShow(creative)}>
            <span className="badge badge-secondary">{creative.params.dimension}</span>
            {
              creative.params.url && creative.params.url.endsWith('mp4')
                ? <video>
                  <source src={creative.params.url} type="video/mp4" autostart="false"/>
                  Your browser does not support the video tag.
                </video>
                : <object data={creative.params.url} />
            }
          </div>
          <div className="card-body">
            <h5>{(creative.params.name) ? creative.params.name : 'No Data'}</h5>
            <ul>
              <li><strong>Impressions</strong>{creative.impressions.toLocaleString()}</li>
              <li><strong>Clicks</strong>{creative.clicks.toLocaleString()}</li>
              <li><strong>CTR</strong>{handleNanValueWithCalculation(creative.clicks, creative.impressions)}%</li>
              <li><strong>Conversion{(creative.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString() === '1') ? '' : 's'}</strong>
                {creative.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}
              </li>
              <li><strong>Conv. rate</strong>{handleNanValueWithCalculation(creative.conversions.reduce((sum, next) => sum + next.count, 0), creative.clicks)}%</li>
            </ul>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" dialogClassName="creative-modal">
        <Modal.Header closeButton>
          {creativeOnModal.params.name}
        </Modal.Header>
        <Modal.Body>
          {
            creativeOnModal.params.url.endsWith('mp4')
              ? <video controls preload="none">
                <source src={creativeOnModal.params.url} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
              : <img src={creativeOnModal.params.url} />
          }
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

// Component props validation
TopCreativeAdsBlock.propTypes = {
  creative: PropTypes.object,
};

export default React.memo(TopCreativeAdsBlock);
