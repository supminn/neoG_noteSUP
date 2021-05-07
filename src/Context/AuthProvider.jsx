import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ uid: "", email: "" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUserData(user));
    return unsubscribe;
  });

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
