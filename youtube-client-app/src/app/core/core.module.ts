import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FilterBlockComponent } from './pages/filter-block/filter-block.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { NotFoundPageComponent } from '../youtube/pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    SearchComponent,
    FilterBlockComponent,
  ],
  imports: [CommonModule, CustomButtonComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
