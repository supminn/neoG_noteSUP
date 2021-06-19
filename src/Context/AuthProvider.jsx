import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user"))|| { uid: "", email: "" });
  const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => setUserData(user));
  //   return unsubscribe;
  // });

  return (
    <AuthContext.Provider value={{ userData, setUserData, showLoader, setShowLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
