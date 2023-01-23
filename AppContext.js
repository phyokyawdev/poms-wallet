import React from 'react';

const AppContext = React.createContext();

export function AppContextProvider({ children }) {
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

export default AppContext;
