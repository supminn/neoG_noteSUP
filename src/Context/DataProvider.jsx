import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const intialState = {
  pinned: [],
  others: [],
  labels: [
    {
      _id: 1,
      name: "General",
    },
    {
      _id: 2,
      name: "Personal",
    },
    {
      _id: 3,
      name: "Work",
    },
  ],
  filter:"General"
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, intialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
