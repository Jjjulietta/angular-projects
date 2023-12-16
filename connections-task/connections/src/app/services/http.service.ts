import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import {
  Conversation,
  ConversationsModel,
  Message,
  MessagesModel,
} from '../models/conversation.model';
import { Group, GroupsModel } from '../models/group.model';
import {
  AuthUser,
  Login,
  Registration,
  User,
  UserProfile,
} from '../models/login.model.ts';
import {
  People,
  PeopleModel,
  UserModel,
  UserModelTwo,
} from '../models/people.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REGISTRATION = 'registration';
  private LOGIN = 'login';
  private PROFILE = 'profile';
  private GROUPS_LIST = 'groups/list';
  private GROUPS_CREATE = 'groups/create';
  private GROUPS_DELETE = 'groups/delete';
  private USERS = 'users';
  private CONVERSATIONS_LIST = 'conversations/list';
  private CONVERSATIONS_CREATE = 'conversations/create';
  private CONVERSATIONS_READ = 'conversations/read';
  private CONVERSATIONS_APPEND = 'conversations/append';
  private CONVERSATIONS_DELETE = 'conversations/delete';

  private GROUPS_READ = 'groups/read';
  private GROUPS_APPEND = 'groups/append';
  constructor(private httpClient: HttpClient, private toast: ToastService) {}

  signup(body: Registration) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(body);
    return this.httpClient.post(`${this.REGISTRATION}`, body).pipe(
      tap((r) => {
        console.log(r);
      }),
      catchError(this.handleError)
    );
  }

  login(body: Login) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.post<AuthUser>(`${this.LOGIN}`, body).pipe(
      tap((r) => {
        console.log(r);
        const obj: AuthUser = Object.assign(r);
        obj.email = body.email;
        return obj;
      }),
      catchError(this.handleError)
    );
  }

  getUser(user: AuthUser) {
    return this.httpClient.get<UserProfile>(this.PROFILE).pipe(
      map((r) => {
        const obj: User = {
          id: r.uid.S,
          email: r.email.S,
          name: r.name.S,
          date: new Date(+r.createdAt.S),
        };
        return obj;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(name: string) {
    return this.httpClient
      .put(this.PROFILE, { name }, { observe: 'response' })
      .pipe(
        tap((r) => {
          console.log(r);
        }),
        catchError(this.handleError)
      );
  }

  getGroups() {
    return this.httpClient.get<GroupsModel>(this.GROUPS_LIST).pipe(
      map((r) => {
        console.log(r);
        return r.Items.map((item) => {
          const obj: Group = {
            id: item.id.S,
            name: item.name.S,
            createdAt: item.createdAt.S,
            createdBy: item.createdBy.S,
          };
          //console.log(obj);
          return obj;
        });
      }),
      catchError(this.handleError)
    );
  }

  createGroup(nameGroup: string) {
    return this.httpClient
      .post<{ groupID: string }>(this.GROUPS_CREATE, { name: nameGroup })
      .pipe(
        map((r) => r),
        catchError(this.handleError)
      );
  }

  deleteGroup(groupId: string) {
    const params = new HttpParams().set('groupID', `${groupId}`);
    return this.httpClient
      .delete(this.GROUPS_DELETE, { observe: 'response', params: params })
      .pipe(
        tap((val) => console.log(val)),
        catchError(this.handleError)
      );
  }

  getPeople() {
    return this.httpClient.get<People>(this.USERS).pipe(
      map((r) => {
        //console.log(r);
        return r.Items.map((item) => {
          const obj: UserModel = { name: item.name.S, id: item.uid.S };

          return obj;
        });
      }),
      catchError(this.handleError)
    );
  }

  getConversations() {
    return this.httpClient
      .get<ConversationsModel>(this.CONVERSATIONS_LIST)
      .pipe(
        map((r) => {
          return r.Items.map((item) => {
            const obj: Conversation = {
              id: item.id.S,
              companionID: item.companionID.S,
            };
            return obj;
          });
        }),
        catchError(this.handleError)
      );
  }

  createConversation(userId: string) {
    return this.httpClient
      .post<{ conversationID: string }>(this.CONVERSATIONS_CREATE, {
        companion: userId,
      })
      .pipe(
        map((val) => {
          const obj: Conversation = {
            id: val.conversationID,
            companionID: userId,
          };
          return obj;
        }),
        catchError(this.handleError)
      );
  }

  getMessages(convId: string, token: string, date?: number) {
    let params = new HttpParams();
    if (date) {
      params = new HttpParams().set(token, convId).set('since', `${date}`);
    } else {
      params = new HttpParams().set(token, convId);
    }
    let url: string = '';
    token === 'conversationID'
      ? (url = this.CONVERSATIONS_READ)
      : (url = this.GROUPS_READ);
    return this.httpClient.get<MessagesModel>(url, { params: params }).pipe(
      map((r) => {
        console.log(r);
        return r.Items.map((item) => {
          const obj: Message = {
            authorID: item.authorID.S,
            message: item.message.S,
            createdAt: item.createdAt.S,
          };
          return obj;
        });
      }),
      catchError(this.handleError)
    );
  }

  sendMessage(convId: string, message: string, token: string) {
    console.log(message);
    console.log(convId);
    let url: string = '';
    let body = {};
    if (token === 'conversationID') {
      url = this.CONVERSATIONS_APPEND;
      body = { conversationID: convId, message: message };
    } else {
      url = this.GROUPS_APPEND;
      body = { groupID: convId, message: message };
    }
    return this.httpClient.post(url, body).pipe(
      tap((r) => console.log(r)),
      catchError(this.handleError)
    );
  }

  deleteConversations(convId: string) {
    return this.httpClient
      .delete(this.CONVERSATIONS_DELETE, {
        observe: 'response',
        params: { conversationID: convId },
      })
      .pipe(
        tap((r) => console.log(r.status)),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(error.error);
      console.error(
        // error.error.error.message
        `Backend returned code ${error.status}, body was: `,
        error.error.message
      );
    }
    return throwError(() => {
      return {
        type: error.error.type,
        message: error.error.message,
      };
    });
  }
}
