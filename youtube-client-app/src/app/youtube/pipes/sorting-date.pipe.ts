import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from '../models/search-item.model';

@Pipe({
  name: 'sortingDate',
})
export class SortingDatePipe implements PipeTransform {
  transform(cards: SearchItem[], value: string): SearchItem[] {
    console.log(value);

    function sortCardsAsc() {
      return cards.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
      );
    }

    function sortCardsDesc() {
      return cards.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    }
    return value === 'asc' ? sortCardsAsc() : sortCardsDesc();
  }
}
