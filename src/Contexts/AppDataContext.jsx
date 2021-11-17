import React, { useContext } from "react";
import { useState } from "react";

const AppDataContext = React.createContext();
let setAppData;

export function useAppData() {
  return [useContext(AppDataContext), setAppData];
}

export default function AppDataProvider({ children }) {
  let appData;
  [appData, setAppData] = useState({
    users: [],
    loggedInUser: null,
    activeHomeElem: null,
    history: [],
  });

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
}
