import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';
import { LoginFormComponent } from './auth/pages/login-form/login-form.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { SearchResultsBlockComponent } from './youtube/pages/search-results-block/search-results-block.component';

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
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
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
