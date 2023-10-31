import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from '../models/search-item.model';

@Pipe({
  name: 'sortingViews',
})
export class SortingViewsPipe implements PipeTransform {
  transform(cards: SearchItem[], value: string): SearchItem[] {
    console.log(value);
    return value === 'asc'
      ? cards.sort((a, b) => +a.statistics.viewCount - +b.statistics.viewCount)
      : cards.sort((a, b) => +b.statistics.viewCount - +a.statistics.viewCount);
  }
}
