import { Conversation, Message } from '../models/conversation.model';
import { Group } from '../models/group.model';
import { AuthUser, User } from '../models/login.model.ts';
import { UserModel } from '../models/people.model';

export interface AppState {
  user: UserData;
  groups: GroupsData;
  people: PeopleData;
  conversations: ConversationsData;
  messages: MessagesData;
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

export interface PeopleData {
  isLoading: boolean;
  people: UserModel[] | null;
  error: string | null;
}

export interface ConversationsData {
  isLoading: boolean;
  conversations: Conversation[] | null;
  error: string | null;
}

export interface MessagesData {
  isLoading: boolean;
  messages: MessagesUser | null;
  error: string | null;
}

export interface MessagesUser {
  [id: string]: Message[];
}
