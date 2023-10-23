import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { LoginComponent } from './header/login/login.component';
import { FilterBlockComponent } from './header/filter-block/filter-block.component';
import { SearchResultsBlockComponent } from './search-results-block/search-results-block.component';
import { SearchResultsItemComponent } from './search-results-block/search-results-item/search-results-item.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterWordPipe } from './pipes/filter-word.pipe';
import { SortingDatePipe } from './pipes/sorting-date.pipe';
import { SortingViewsPipe } from './pipes/sorting-views.pipe';
import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    LoginComponent,
    FilterBlockComponent,
    SearchResultsBlockComponent,
    SearchResultsItemComponent,
    HighlightDirective,
    FilterWordPipe,
    SortingDatePipe,
    SortingViewsPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, CustomButtonComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
