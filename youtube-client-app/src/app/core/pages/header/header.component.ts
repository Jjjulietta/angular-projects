import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShown = false;
  public word = '';

  @Output() onClick = new EventEmitter();

  toggleFilterBlock() {
    this.isShown = !this.isShown;
    this.onClick.emit(this.isShown);
  }
}
