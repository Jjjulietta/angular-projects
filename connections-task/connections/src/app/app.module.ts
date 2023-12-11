import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpService } from './services/http.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileComponent } from './profile/profile.component';
import { userReducer } from './store/reducers/user.reduser';
import { UserEffects } from './store/effects/user.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PeopleGroupsComponent } from './people-groups/people-groups.component';
import { authGuard } from './guards/auth.guard';
import { UnsubscribeService } from './services/unsubscribe.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UpdateUserEffects } from './store/effects/update-user.effect';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './services/toast.service';
import { GroupsEffects } from './store/effects/groups.effect';
import { groupReducer } from './store/reducers/groups.reducer';
import { CreateGroupEffects } from './store/effects/create-group.effect';
import { PeopleReducer } from './store/reducers/people.reducer';
import { PeopleEffects } from './store/effects/people.effect';
import { ConversationComponent } from './conversation/conversation.component';
import { conversationsReducer } from './store/reducers/conversations.reducer';
import { ConversationsEffects } from './store/effects/conversations.effect';
import { CreateConversationEffect } from './store/effects/create-conversation.effect';
import { messagesReducer } from './store/reducers/messages.reducer';
import { MessagesEffect } from './store/effects/messages.effect';
import { ButtonUpdateComponent } from './button-update/button-update.component';
import { CreateMessagesEffect } from './store/effects/create-messages.effect';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    PeopleGroupsComponent,
    ConversationComponent,
    ButtonUpdateComponent,
    ToastComponent,
    ThemeComponent,
    HeaderComponent,
    NotFoundComponent,
    StoreModule.forRoot(
      {
        user: userReducer,
        groups: groupReducer,
        people: PeopleReducer,
        conversations: conversationsReducer,
        messages: messagesReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      UserEffects,
      UpdateUserEffects,
      GroupsEffects,
      CreateGroupEffects,
      PeopleEffects,
      ConversationsEffects,
      CreateConversationEffect,
      MessagesEffect,
      CreateMessagesEffect,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HttpService },
    { provide: AuthService },
    { provide: UnsubscribeService },
    { provide: ToastService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
