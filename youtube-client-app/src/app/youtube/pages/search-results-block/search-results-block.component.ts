import { Component, Input } from '@angular/core';
import { SearchItem, SearchItemVideo } from '../../models/search-item.model';
import { SortingService } from '../../../core/services/sorting.service';
import { YoutubeService } from '../../services/youtube.service';
import { SortType } from 'src/app/core/enums/sort-type';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent {
  cards: SearchItemVideo[] = [];
  sort: SortType | string = SortType.Default;
  sortView: SortType = SortType.Default;
  word: string | null = null;
  submit: string | null = null;

  constructor(
    private SortingService: SortingService,
    private YoutubeService: YoutubeService
  ) {
    this.YoutubeService.submit.subscribe((val: string) => {
      this.submit = val;
      console.log(this.submit);
      if (val) {
        this.cards = this.YoutubeService.resultsSearch;
      }
    });
  }

  ngOnInit() {
    // console.log(this.cards[0]);

    this.SortingService.onSortDate.subscribe((val) => {
      this.sort = val;
    });
    this.SortingService.onSortView.subscribe((val) => (this.sortView = val));
    this.SortingService.onFilterWord.subscribe((val) => {
      if (val !== null) this.word = val;
    });

    console.log(this.sort);
  }
}
