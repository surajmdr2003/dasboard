import React, {useState} from 'react';
import Routes from './Routes';

// Constants
import Dates from './constants/dates';

// Contexts
import GlobalContext from './context/GlobalContext';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState({id: null});
  const [dateFilterRange, setDateFilterRange] = useState({
    days: 30,
    startDate: Dates.dateRange.startDate,
    endDate: Dates.dateRange.endDate,
  });

  // Render App
  return (
    <GlobalContext.Provider value={{
      user, setUser,
      activeCampaign, setActiveCampaign,
      dateFilterRange, setDateFilterRange,
    }}>
      <Routes/>
    </GlobalContext.Provider>
  );
};

export default App;
