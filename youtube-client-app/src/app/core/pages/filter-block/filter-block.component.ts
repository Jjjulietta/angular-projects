import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  public sort = 'default';
  public sortView = 'default';
  public inputWord = '';
  @Output() onSortDate = new EventEmitter();
  @Output() onSortView = new EventEmitter();
  @Output() onFilterWord = new EventEmitter();

  clickSortDate() {
    if (this.sort === 'default' || this.sort === 'desc') {
      this.sort = 'asc';
    } else if (this.sort === 'asc') {
      this.sort = 'desc';
    }
    console.log(this.sort);
    this.onSortDate.emit(this.sort);
  }

  clickSortView() {
    if (this.sortView === 'default' || this.sortView === 'desc') {
      this.sortView = 'asc';
    } else if (this.sortView === 'asc') {
      this.sortView = 'desc';
    }
    console.log(this.sortView);
    this.onSortView.emit(this.sortView);
  }

  ngOnChange(word: string) {
    console.log(word);
    this.onFilterWord.emit(word);
  }
}
