import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShown = false;
  public inputSearch = '';

  @Output() onClick = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  toggleFilterBlock() {
    this.isShown = !this.isShown;
    this.onClick.emit(this.isShown);
  }

  clickSearch(input: string) {
    this.inputSearch = input;
    this.onSubmit.emit(this.inputSearch);
  }
}
