import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsBlockComponent } from './youtube/pages/search-results-block/search-results-block.component';
import { SearchResultsItemComponent } from './youtube/components/search-results-item/search-results-item.component';
import { HighlightDirective } from './youtube/directives/highlight.directive';
import { FilterWordPipe } from './youtube/pipes/filter-word.pipe';
import { SortingDatePipe } from './youtube/pipes/sorting-date.pipe';
import { SortingViewsPipe } from './youtube/pipes/sorting-views.pipe';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsBlockComponent,
    SearchResultsItemComponent,
    HighlightDirective,
    FilterWordPipe,
    SortingDatePipe,
    SortingViewsPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, CustomButtonComponent, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
