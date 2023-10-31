import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  onSortDate = new EventEmitter<string>();
  onSortView = new EventEmitter<string>();
  onFilterWord = new EventEmitter<string>();
  constructor() {}
}
