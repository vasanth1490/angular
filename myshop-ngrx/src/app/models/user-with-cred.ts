import { User } from './user';

export interface UserWithCred extends User {
  password?: string;
}