import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const intialState = {
  pinned: [],
  others: [],
  labels: [
    {
      id: 1,
      name: "All Notes",
    },
    {
      id: 2,
      name: "Personal",
    },
    {
      id: 3,
      name: "Work",
    },
  ],
  filter:"All Notes"
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, intialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
