import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cogoToast from 'cogo-toast';

// Assets
const pageNotFound = '../../assets/images/404.png';
const iframeErrorScrn = '../../assets/images/iframe-image-not-load.png';

// Services
import CampaignService from '../../services/campaign.service';

const PagePreview = ({ pageUrl }) => {
  const [iframeState, setIframeState] = useState({
    isLoading: false,
    isLoadable: false,
    loadView: '',
  });

  /**
   * Load page url for mobile view
   * @param {String} pagePath
   */
  const loadPageOnMobile = (pagePath) => {
    if (!pagePath) {
      return setIframeState({ ...iframeState, isLoading: false, loadView: pageNotFound, isLoadable: true });
    }

    setIframeState({ ...iframeState, isLoading: true });

    return CampaignService.checkIfSiteCanBeLoaded(pagePath)
      .then(response => {
        const isLoadable = response.data.headers['X-Frame-Options'] || response.data.responseCode !== 200;
        setIframeState({ ...iframeState, isLoading: false, isLoadable, loadView: (!isLoadable ? pagePath : iframeErrorScrn) });
      })
      .catch(() => cogoToast.error('Coundn\'t verifiy the url can be loaded.', { position: 'bottom-left' }));
  };

  const getFramepreview = () => {
    return iframeState.isLoadable && iframeState.loadView
      ? iframeState.loadView.endsWith('.png')
        ? <object data={iframeState.loadView} />
        : <iframe src={iframeState.loadView} />
      : <iframe src={iframeState.loadView} />;
  };

  useEffect(() => {
    loadPageOnMobile(pageUrl);
  }, [pageUrl]);

  const loaderStyles = {
    'position': 'absolute',
    'top': '0px',
    'left': '0px',
    'width': '100%',
    'height': '100%',
    'zIndex': '1',
    'background': 'white',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
  };

  return (
    <div className="page-on-phone-preview" style={{ 'position': 'relative' }}>
      {iframeState.isLoading
        ? <div className="text-center" style={loaderStyles}>
          <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
        </div>
        : ''
      }
      { getFramepreview()}
    </div>
  );
};

PagePreview.propTypes = {
  pageUrl: PropTypes.string,
};

export default PagePreview;
