import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError: isTokenError } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    }
  );

  const { isError: isSessionError } = useQuery(
    "checkSession",
    apiClient.checkSession,
    {
      retry: false,
    }
  );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isTokenError && !isSessionError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
