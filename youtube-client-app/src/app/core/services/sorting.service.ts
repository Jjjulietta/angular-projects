import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SortType } from '../enums/sort-type';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sort = new BehaviorSubject<SortType>(SortType.Default);
  sortView = new BehaviorSubject<SortType>(SortType.Default);
  filterWord = new BehaviorSubject<string>('');
  private sort$ = new BehaviorSubject<SortType>(this.sortVal);
  //onSortDate = new EventEmitter<SortType>();
  //onSortView = new EventEmitter<SortType>();
  //onFilterWord = new EventEmitter<string>();
  constructor() {}
  get sortVal() {
    console.log(this.sort.getValue());
    return this.sort.getValue();
  }
  get gameHistory() {
    return this.sort$.getValue();
  }
}
