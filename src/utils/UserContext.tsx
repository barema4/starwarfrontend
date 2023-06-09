import React, { createContext, useState } from "react";

interface user {
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
}
interface UserContextType {
  users: user[];
  setUsers: React.Dispatch<React.SetStateAction<{}[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  setUsers: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentPage, setCurrentPage }}
    >
      {children}
    </UserContext.Provider>
  );
};
