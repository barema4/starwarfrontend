import React, { createContext, useState } from 'react';

interface UserContextType {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  setUsers: () => {},
});

interface Props {
    children: React.ReactNode;
  }

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
