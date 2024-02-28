import { UserContextType, UserForm, UserModel } from "@/@types/user";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { generateRandomString } from "@/utils/string";
import React, { useContext, useEffect, useMemo, useState } from "react";

export const UserContext = React.createContext<UserContextType>({
  users: [],
  selectCard: null,
  selectCardInfo: undefined,
  addNewUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  clearAllUsers: () => {},
  setSelectCard: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selectCard, setSelectCard] = useState<string | null>(null); // store id of select card

  // Get the Full Info of Select Card
  const selectCardInfo = users.find((user) => user.id === selectCard);

  const addNewUser = (user: UserForm) => {
    // Generate 5 character random string
    const id = generateRandomString(5);
    const newUser = { ...user, id };
    setUsers((prev) => {
      const newAllUsers = [...prev, newUser];
      setLocalStorage("user", newAllUsers);

      return newAllUsers;
    });
  };

  const updateUser = (id: string, newUpdateUser: UserForm) => {
    const newUsers = users.map((user) => {
      // If the existed user id === id we want to update
      // Update the info of user
      if (user.id === id) {
        return {
          ...user,
          ...newUpdateUser,
        };
      }
      // Else, return the existed user
      return user;
    });

    setLocalStorage("user", newUsers);
    setUsers(newUsers);
  };

  const deleteUser = (id: string) => {
    const remainUsers = users.filter((user) => user.id !== id);

    setLocalStorage("user", remainUsers);
    setUsers(remainUsers);
  };

  const clearAllUsers = () => {
    setLocalStorage("user", []);
    setUsers([]);
  };

  // Check if the users data is in local storage for the first render
  useEffect(() => {
    const userStorage = getLocalStorage("user") ? getLocalStorage("user") : [];
    setUsers(userStorage);
  }, []);

  const value = {
    users,
    selectCard,
    selectCardInfo,
    addNewUser,
    updateUser,
    deleteUser,
    clearAllUsers,
    setSelectCard,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export default UserProvider;
