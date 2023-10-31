import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CustomButtonComponent, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
