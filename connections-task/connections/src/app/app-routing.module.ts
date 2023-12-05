import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'signin',
    pathMatch: 'full',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./people-groups/people-groups.component').then(
        (m) => m.PeopleGroupsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'group/:groupID',
    loadComponent: () =>
      import('./conversation/conversation.component').then(
        (m) => m.ConversationComponent
      ),
  },
  {
    path: 'conversation/:conversationID',
    loadComponent: () =>
      import('./conversation/conversation.component').then(
        (m) => m.ConversationComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
