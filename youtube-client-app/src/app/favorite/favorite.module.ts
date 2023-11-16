import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { SearchResultsItemComponent } from '../youtube/components/search-results-item/search-results-item.component';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, FavoriteRoutingModule, YoutubeModule],
})
export class FavoriteModule {}
