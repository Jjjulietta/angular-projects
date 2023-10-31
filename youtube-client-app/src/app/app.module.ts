import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsBlockComponent } from './search-results-block/search-results-block.component';
import { SearchResultsItemComponent } from './search-results-block/search-results-item/search-results-item.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterWordPipe } from './pipes/filter-word.pipe';
import { SortingDatePipe } from './pipes/sorting-date.pipe';
import { SortingViewsPipe } from './pipes/sorting-views.pipe';
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
