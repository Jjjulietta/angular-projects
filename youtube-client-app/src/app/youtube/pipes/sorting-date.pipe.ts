import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from '../models/search-item.model';

@Pipe({
  name: 'sortingDate',
})
export class SortingDatePipe implements PipeTransform {
  transform(cards: SearchItem[], value: string): SearchItem[] {
    console.log(value);
    if (value === 'asc') {
      return cards.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
      );
    } else {
      return cards.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    }
  }
}
