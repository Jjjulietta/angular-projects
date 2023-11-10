import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem, SearchItemVideo } from '../models/search-item.model';

@Pipe({
  name: 'filterWord',
})
export class FilterWordPipe implements PipeTransform {
  transform(cards: SearchItemVideo[], value: string | null): SearchItemVideo[] {
    console.log(value);
    if (!value || value === null) {
      return cards;
    }
    return cards.filter((item) => {
      /* if (item.snippet.title.toLowerCase().indexOf(value) === 0) {
        return item;
      } */
      return item.snippet.title.toLowerCase().includes(value)
        ? item
        : undefined;
    });
  }
}
