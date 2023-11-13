import { Pipe, PipeTransform } from '@angular/core';
import { SearchCards } from '../models/search-item.model';

@Pipe({
  name: 'filterWord',
})
export class FilterWordPipe implements PipeTransform {
  transform(cards: SearchCards[], value: string | null): SearchCards[] {
    console.log(value);
    if (!value || value === null) {
      return cards;
    }
    return cards.filter((item) => {
      return item.title !== null && item.title.toLowerCase().includes(value)
        ? item
        : undefined;
    });
  }
}
