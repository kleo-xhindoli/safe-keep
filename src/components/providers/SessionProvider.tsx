import React, { useState } from "react";
import { useComputed } from "../../hooks/utils";
import { User } from "../../types/user";

export interface SessionState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

interface SessionContextValue extends SessionState {
  setCurrentUser: (currentUser: User | null) => void;
}

export const SessionContext = React.createContext<SessionContextValue>({
  currentUser: null,
  isAuthenticated: false,
  setCurrentUser: () => {},
});

interface SessionProviderProps {}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isAuthenticated = useComputed(() => Boolean(currentUser), [
    currentUser,
  ]);

  return (
    <SessionContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
