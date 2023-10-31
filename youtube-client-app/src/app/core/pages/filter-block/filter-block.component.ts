import { Component } from '@angular/core';
import { SortType } from '../../enums/sort-type';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  public sort: SortType = SortType.Default;
  public sortView: SortType = SortType.Default;
  public inputWord = null;
  constructor(private SortingServise: SortingService) {}
  // @Output() onSortDate = new EventEmitter();
  // @Output() onSortView = new EventEmitter();
  // @Output() onFilterWord = new EventEmitter();

  clickSortDate() {
    if (this.sort === 'default' || this.sort === 'desc') {
      this.sort = SortType.Asc;
    } else if (this.sort === 'asc') {
      this.sort = SortType.Desc;
    }
    console.log(this.sort);
    this.SortingServise.onSortDate.emit(this.sort);
  }

  clickSortView() {
    if (this.sortView === 'default' || this.sortView === 'desc') {
      this.sortView = SortType.Asc;
    } else if (this.sortView === 'asc') {
      this.sortView = SortType.Desc;
    }
    console.log(this.sortView);
    this.SortingServise.onSortView.emit(this.sortView);
  }

  ngOnChange(word: string) {
    console.log(word);
    if (word !== null) this.SortingServise.onFilterWord.emit(word);
  }
}
