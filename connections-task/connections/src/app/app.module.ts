import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    PeopleGroupsComponent,
    StoreModule.forRoot({ user: userReducer }, {}),
    EffectsModule.forRoot([UserEffects, UpdateUserEffects]),
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
    { provide: UnsubscribeService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
