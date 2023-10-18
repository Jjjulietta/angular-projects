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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    LoginComponent,
    FilterBlockComponent,
    SearchResultsBlockComponent,
    SearchResultsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
