import React, {useState} from 'react';
import Routes from './Routes';

// Constants
import Dates from './constants/dates';

// Contexts
import GlobalContext from './context/GlobalContext';

const initDateFilterRange = {
  label: 'Last 30 days',
  startDate: Dates.dateRange.startDate,
  endDate: Dates.dateRange.endDate,
};

const App = () => {
  const [user, setUser] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState({id: null});
  const [campaignDateFilterRange, setCampaignDateFilterRange] = useState(initDateFilterRange);
  const [creativesDateFilterRange, setCreativesDateFilterRange] = useState(initDateFilterRange);
  const [landingDateFilterRange, setLandingDateFilterRange] = useState(initDateFilterRange);
  const [CLDateFilterRange, setCLDateFilterRange] = useState(initDateFilterRange);
  const [pageDateFilterRange, setPageDateFilterRange] = useState(initDateFilterRange);

  // Render App
  return (
    <GlobalContext.Provider value={{
      user, setUser,
      activeCampaign, setActiveCampaign,
      campaignDateFilterRange, setCampaignDateFilterRange,
      creativesDateFilterRange, setCreativesDateFilterRange,
      landingDateFilterRange, setLandingDateFilterRange,
      CLDateFilterRange, setCLDateFilterRange,
      pageDateFilterRange, setPageDateFilterRange,
    }}>
      <Routes/>
    </GlobalContext.Provider>
  );
};

export default App;
