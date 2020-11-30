import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import cogoToast from 'cogo-toast';

// Assets
const pageNotFound = '../../assets/images/404.png';

// Services
import CampaignService from '../../services/campaign.service';

const PagePreview = ({pageUrl}) => {
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
    setIframeState({ ...iframeState, isLoading: true});
    CampaignService.checkIfSiteCanBeLoaded(pagePath)
      .then(response => {
        const isLoadable = response.data.headers['X-Frame-Options'] || response.data.responseCode !== 200;
        setIframeState({ ...iframeState, isLoading: false, isLoadable, loadView: (!isLoadable ? pagePath : pageNotFound)});
      })
      .catch(() => cogoToast.error('Coundn\'t verifiy the url can be loaded.', { position: 'bottom-left' }));
  };

  useEffect(() => {
    pageUrl && loadPageOnMobile(pageUrl);
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
    <div className="page-on-phone-preview" style={{'position': 'relative'}}>
      {iframeState.isLoading
        ? <div className="text-center" style={loaderStyles}>
          <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
        </div>
        : ''
      }
      { iframeState.isLoadable && iframeState.loadView
        ? iframeState.loadView.endsWith('.png')
          ? <object data={iframeState.loadView} />
          : <iframe src={iframeState.loadView} />
        : <iframe src={iframeState.loadView} />
      }
    </div>
  );
};

PagePreview.propTypes = {
  pageUrl: PropTypes.string,
};

export default PagePreview;
