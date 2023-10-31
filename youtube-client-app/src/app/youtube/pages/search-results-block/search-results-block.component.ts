import { Component, Input } from '@angular/core';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent {
  @Input() cards: SearchItem[] = [];
  @Input() sort: string = '';
  @Input() sortView: string = '';
  @Input() word: string = '';
}
