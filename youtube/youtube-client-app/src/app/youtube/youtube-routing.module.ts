import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsBlockComponent } from './pages/search-results-block/search-results-block.component';

const routes: Routes = [{ path: '', component: SearchResultsBlockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
