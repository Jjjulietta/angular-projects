export enum ToastMessage {
  SucsessLogin = 'You have sucsessfully logged in',
  SucsessSignin = 'You have sucsessfully registered!',
  SucsessDelete = 'Group sucsessfully deleted',
  SucsessUpdateGroup = 'Group list sucsessfully updated',
  SucsessUpdatePeople = 'User list sucsessfully updated',
  SucsessUpdateMessages = 'Message list sucsessfully updated',
  SucsessCreate = 'Group sucsessfully created',
  SucsessDeleteConv = 'Conversation sucsessfully deleted',
  SucsessCreateConv = 'Conversation sucsessfully created',
  SucsessUpdateUserName = 'User name sucsessfully updated',
  Error = 'An error occurred',

  ErrorType = 'PrimaryDuplicationException',
  ErrorTypeNotFound = 'NotFoundException',
}

export enum ToastState {
  Sucsess = 'sucsess-toast',
  Error = 'error-toast',
}

export interface ErrorMessages {
  type: string;
  message: string;
}
