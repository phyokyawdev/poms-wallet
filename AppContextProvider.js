import * as React from 'react';
import AppContext from './AppContext';

function AppContextProvider({ children }) {
  const [state, setState] = React.useState({
    serverIpAddress: '',
    currentAccount: {
      privateKey: '',
      address: ''
    }
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
