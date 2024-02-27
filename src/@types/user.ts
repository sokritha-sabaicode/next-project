export interface UserModel {
  readonly id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface UserContextType {
  users: UserModel[];
  addNewUser: (user: UserModel) => void;
  updateUser: (id: string, newUpdateUser: UserForm) => void;
  deleteUser: (id: string) => void;
}

export type UserForm = Omit<UserModel, "id">;
