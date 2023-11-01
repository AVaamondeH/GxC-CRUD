import { User } from "./user.entity";

export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    createUser(user: User): Promise<User>;
  }