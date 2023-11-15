import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ApiInterceptor } from './youtube/interceptors/api.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { cardsReducer } from './redux/reducers/cards.reducer';
import { customCardsReducer } from './redux/reducers/custom-cards.reducer';
import { CustomButtonFavoriteComponent } from './custom-button-favorite/custom-button-favorite.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomButtonComponent,
    CustomButtonFavoriteComponent,
    CoreModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { youtubeCards: cardsReducer, customCards: customCardsReducer },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
