export interface ConversationsModel {
  Count: number;
  Items: ConversationModel[];
}

export interface ConversationModel {
  id: { S: string };
  companionID: { S: string };
}

export interface MessagesModel {
  count: number;
  Items: MessageModel[];
}

export interface MessageModel {
  authorID: { S: string };
  message: { S: string };
  createdAt: { S: string };
}

export interface Conversations {
  conversations: Conversation[];
}

export interface Conversation {
  id: string;
  companionID: string;
}

export interface Message {
  authorID: string;
  message: string;
  createdAt: string;
}
