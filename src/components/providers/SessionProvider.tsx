import React, { useEffect, useState } from "react";
import { useComputed } from "../../hooks/utils";
import { User } from "../../types/user";
import * as firebase from "firebase/app";
import "firebase/auth";

export interface SessionState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAppInitialized: boolean;
}

interface SessionContextValue extends SessionState {
  setCurrentUser: (currentUser: User | null) => void;
}

export const SessionContext = React.createContext<SessionContextValue>({
  currentUser: null,
  isAuthenticated: false,
  isAppInitialized: false,
  setCurrentUser: () => {},
});

interface SessionProviderProps {}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const isAuthenticated = useComputed(() => Boolean(currentUser), [
    currentUser,
  ]);

  useEffect(() => {
    const callback = (state: User | null) => {
      console.log("Auth state changed ", state);
      setCurrentUser(state);
      if (!isAppInitialized) setIsAppInitialized(true);
    };
    firebase.auth().onAuthStateChanged(callback);
  }, [setCurrentUser, isAppInitialized]);

  return (
    <SessionContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated, isAppInitialized }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
