import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'signin',
    pathMatch: 'full',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [notAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
    canActivate: [notAuthGuard],
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
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'group/:groupID',
    loadComponent: () =>
      import('./conversation/conversation.component').then(
        (m) => m.ConversationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'conversation/:conversationID',
    loadComponent: () =>
      import('./conversation/conversation.component').then(
        (m) => m.ConversationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
    //canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
