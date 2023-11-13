import { Pipe, PipeTransform } from '@angular/core';
import { SearchCards } from '../models/search-item.model';

@Pipe({
  name: 'sortingDate',
})
export class SortingDatePipe implements PipeTransform {
  transform(cards: SearchCards[], value: string): SearchCards[] {
    console.log(value);

    function sortCardsAsc() {
      return cards.sort((a, b) =>
        a.date !== null && b.date !== null
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : 0
      );
    }

    function sortCardsDesc() {
      return cards.sort((a, b) =>
        a.date !== null && b.date !== null
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : 0
      );
    }
    return value === 'asc' ? sortCardsAsc() : sortCardsDesc();
  }
}
