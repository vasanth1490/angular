import { User } from './user';

export interface Session {
  user: User;
  isLoggedIn: boolean;
}