import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsBlockComponent } from './pages/search-results-block/search-results-block.component';
import { SearchResultsItemComponent } from './components/search-results-item/search-results-item.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SortingDatePipe } from './pipes/sorting-date.pipe';
import { SortingViewsPipe } from './pipes/sorting-views.pipe';
import { FilterWordPipe } from './pipes/filter-word.pipe';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    SearchResultsBlockComponent,
    SearchResultsItemComponent,
    DetailedInfoPageComponent,
    NotFoundPageComponent,
    HighlightDirective,
    SortingDatePipe,
    SortingViewsPipe,
    FilterWordPipe,
  ],
  imports: [CommonModule, YoutubeRoutingModule, CustomButtonComponent],
})
export class YoutubeModule {}
