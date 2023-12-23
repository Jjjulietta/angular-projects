import { Component } from '@angular/core';
import { SortType } from '../../enums/sort-type';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  public inputWord = null;
  countSort = 0;
  countSortView = 0;
  constructor(private sortingServise: SortingService) {}

  clickSortDate() {
    if (this.countSort === 0) {
      this.sortingServise.sortingState$ = SortType.Asc;
      this.countSort += 1;
    } else if (this.countSort === 1) {
      this.sortingServise.sortingState$ = SortType.Desc;
      this.countSort -= 1;
    }
  }

  clickSortView() {
    if (this.countSortView === 0) {
      console.log(this.countSortView);
      this.sortingServise.sortinViewState$ = SortType.Asc;
      this.countSortView += 1;
    } else if (this.countSortView === 1) {
      console.log(this.countSortView);
      this.sortingServise.sortinViewState$ = SortType.Desc;
      this.countSortView -= 1;
    }
  }

  onChange(word: string) {
    console.log(word);
    if (word !== null) this.sortingServise.wordState$ = word;
  }
}
