export interface ConversationsModel {
  Count: number;
  Items: ConversationModel[];
}

export interface ConversationModel {
  id: { S: string };
  companionID: { S: string };
}

export interface ConversationMessages {
  count: number;
  Items: MessageModel[];
}

export interface MessageModel {
  authorID: { S: string };
  message: { S: string };
  CreatedAt: { S: string };
}

export interface Conversations {
  conversations: Conversation[];
}

export interface Conversation {
  id: string;
  companionID: string;
}
