import { Dispatch, SetStateAction } from "react";

export interface UserModel {
  readonly id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface UserContextType {
  users: UserModel[];
  selectCard: string | null;
  selectCardInfo: UserModel | undefined;
  addNewUser: (user: UserForm) => void;
  updateUser: (id: string, newUpdateUser: UserForm) => void;
  deleteUser: (id: string) => void;
  clearAllUsers: () => void;
  setSelectCard: Dispatch<SetStateAction<string | null>>;
}

export type UserForm = Omit<UserModel, "id">;
