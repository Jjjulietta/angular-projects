import { AuthUser, User } from '../models/login.model.ts';

export interface AppState {
  user: UserData;
}

export interface UserData {
  isLoading: boolean;
  authUser: User | null;
  error: string | null;
}
