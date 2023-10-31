import { EventEmitter, Injectable } from '@angular/core';
import { SortType } from '../enums/sort-type';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  onSortDate = new EventEmitter<SortType>();
  onSortView = new EventEmitter<SortType>();
  onFilterWord = new EventEmitter<string>();
  constructor() {}
}
