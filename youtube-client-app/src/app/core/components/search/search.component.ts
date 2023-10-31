import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string = '';
  @Output() submit = new EventEmitter();

  ngOnChange(text: string) {
    this.inputText = text;
    this.submit.emit(this.inputText);
  }
}
