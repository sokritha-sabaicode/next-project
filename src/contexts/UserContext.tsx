import { UserContextType, UserForm, UserModel } from "@/@types/user";
import { generateRandomString } from "@/utils/string";
import React, { useContext, useEffect, useState } from "react";

export const UserContext = React.createContext<UserContextType>({
  users: [],
  addNewUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const addNewUser = (user: UserForm) => {
    // Generate 5 character random string
    const id = generateRandomString(5);
    const newUser = {...user, id};
    setUsers(prev => [...prev, newUser])
  }

  const updateUser = (id: string, newUpdateUser: UserForm) => {
    const newUsers = users.map(user => {
      // If the existed user id === id we want to update
      // Update the info of user
      if (user.id === id){
        return {
          ...user,
          ...newUpdateUser
        }
      }
      // Else, return the existed user
      return user;
    })
    setUsers(newUsers)
  }

  const deleteUser = (id: string) => {
    const remainUsers = users.filter(user => user.id !== id);
    setUsers(remainUsers)
  }

  // Check if the users data is in local storage for the first render
  useEffect(()=> {
    setUsers(JSON.parse(localStorage.getItem("user") || "[]"))
  }, [])

  // Update the users data in local storage if users context state modified
  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(users));
  }, [users])

  const value = {users, addNewUser, updateUser, deleteUser};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined){
    throw new Error('useUser must be used within a UserProvider')
  }

  return context;
}

export default UserProvider;
