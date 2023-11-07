import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';
import { NotFoundPageComponent } from './youtube/pages/not-found-page/not-found-page.component';
import { DetailedInfoPageComponent } from './youtube/pages/detailed-info-page/detailed-info-page.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    canActivate: [authGuardGuard],
  },
  { path: 'detailed/:id', component: DetailedInfoPageComponent },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuardGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
