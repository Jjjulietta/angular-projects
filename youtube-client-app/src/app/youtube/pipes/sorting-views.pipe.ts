import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from '../models/search-item.model';

@Pipe({
  name: 'sortingViews',
})
export class SortingViewsPipe implements PipeTransform {
  transform(cards: SearchItem[], value: string): SearchItem[] {
    console.log(value);
    if (value === 'asc') {
      return cards.sort(
        (a, b) => +a.statistics.viewCount - +b.statistics.viewCount
      );
    } else {
      return cards.sort(
        (a, b) => +b.statistics.viewCount - +a.statistics.viewCount
      );
    }
  }
}
