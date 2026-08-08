import React, {
  createContext,
  useState,
  useContext,
} from "react";

const AuthContext =
  createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [
    currentUser,
    setCurrentUser,
  ] = useState<any>(null);

  const [
    currentRole,
    setCurrentRole,
  ] = useState("");

  const login = (
    user: any,
    role: string
  ) => {

    setCurrentUser(user);

    setCurrentRole(role);

  };

  const logout = () => {

    setCurrentUser(null);

    setCurrentRole("");

  };

  return (

    <AuthContext.Provider
      value={{

        currentUser,

        currentRole,

        login,

        logout,

        setCurrentRole,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () =>
  useContext(AuthContext);