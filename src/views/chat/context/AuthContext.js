import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  // Log the initial value of authUser
  console.log("Initial authUser value:", authUser);

  const handleAuthUserChange = (newAuthUser) => {
    // Log the new authUser value when it changes
    console.log("New authUser value:", newAuthUser);
    setAuthUser(newAuthUser);
  };

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser: handleAuthUserChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};
