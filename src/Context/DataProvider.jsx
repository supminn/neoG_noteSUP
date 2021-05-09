import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const initialState = {
  pinned: [],
  others: [],
  labels: [],
  filter: "All Notes",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
