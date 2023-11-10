import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ApiInterceptor } from './youtube/interceptors/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomButtonComponent,
    CoreModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
