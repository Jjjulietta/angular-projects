import { isNgContent } from '@angular/compiler';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShown = false;
  public word = '';
  favorite: string = 'inactive';
  custom: string = 'favorite video';

  @Output() onClick = new EventEmitter();

  constructor(private router: Router) {}

  toggleFilterBlock() {
    this.isShown = !this.isShown;
    this.onClick.emit(this.isShown);
  }

  openFavoritePage() {
    if (this.favorite === 'inactive') {
      this.favorite = 'svg';
      console.log(this.favorite);
      this.router.navigate(['favorite']);
    } else if (this.favorite === 'svg') {
      this.favorite = 'inactive';
      console.log(this.favorite);
      this.router.navigate(['main']);
    }
  }
}
