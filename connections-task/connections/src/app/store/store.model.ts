import { Group } from '../models/group.model';
import { AuthUser, User } from '../models/login.model.ts';

export interface AppState {
  user: UserData;
  groups: GroupsData;
}

export interface UserData {
  isLoading: boolean;
  authUser: User | null;
  error: string | null;
}

export interface GroupsData {
  isLoading: boolean;
  groups: Group[] | null;
  error: string | null;
}
