import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsBlockComponent } from './youtube/pages/search-results-block/search-results-block.component';

const routes: Routes = [
  {
    path: 'main',
    component: SearchResultsBlockComponent,
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
