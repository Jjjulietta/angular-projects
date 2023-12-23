import { Pipe, PipeTransform } from '@angular/core';
import { SearchCards } from '../models/search-item.model';

@Pipe({
  name: 'sortingViews',
})
export class SortingViewsPipe implements PipeTransform {
  transform(cards: SearchCards[], value: string): SearchCards[] {
    console.log(value);
    return value === 'asc'
      ? cards.sort((a, b) =>
          a.statistics && b.statistics
            ? +a.statistics.viewCount - +b.statistics.viewCount
            : 0
        )
      : cards.sort((a, b) =>
          a.statistics && b.statistics
            ? +b.statistics.viewCount - +a.statistics.viewCount
            : 0
        );
  }
}
