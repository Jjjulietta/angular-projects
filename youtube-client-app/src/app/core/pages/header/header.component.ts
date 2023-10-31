import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isShown = false;
  // public inputSearch = '';
  // public sort = '';
  // public sortView = '';
  public word = '';

  @Output() onClick = new EventEmitter();
  // @Output() onSubmit = new EventEmitter();
  // @Output() onSortDate = new EventEmitter();
  // @Output() onSortView = new EventEmitter();
  // @Output() onFilterWord = new EventEmitter();

  toggleFilterBlock() {
    this.isShown = !this.isShown;
    this.onClick.emit(this.isShown);
  }

  /*clickSearch(input: string) {
    this.inputSearch = input;
    this.onSubmit.emit(this.inputSearch);
  }

  toggleSort(sort: string) {
    this.sort = sort;
    console.log(this.sort);
    this.onSortDate.emit(this.sort);
  }

  toggleSortView(sortView: string) {
    console.log(sortView);
    this.sortView = sortView;
    console.log(this.sortView);
    this.onSortView.emit(this.sortView);
  }

  inputWord(word: string) {
    console.log(word);
    this.word = word;
    this.onFilterWord.emit(this.word);
  } */
}
