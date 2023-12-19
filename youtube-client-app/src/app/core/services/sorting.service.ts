import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SortType } from '../enums/sort-type';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sortView = new BehaviorSubject<SortType>(SortType.Default);
  filterWord = new BehaviorSubject<string>('');
  sort = new BehaviorSubject<SortType>(SortType.Default);
  constructor() {}

  getSortingState$() {
    return this.sort.asObservable();
  }

  set sortingState$(val: SortType) {
    this.sort.next(val);
  }

  getSortinViewState$() {
    return this.sortView.asObservable();
  }

  set sortinViewState$(val: SortType) {
    this.sortView.next(val);
  }

  getWordState$() {
    return this.filterWord.asObservable();
  }

  set wordState$(val: string) {
    this.filterWord.next(val);
  }
}
