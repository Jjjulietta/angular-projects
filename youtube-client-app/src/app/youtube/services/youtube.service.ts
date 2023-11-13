import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { data } from 'src/data/mock-data';
import { Options } from '../models/option.model';
import {
  SearchCards,
  SearchItem,
  SearchItemVideo,
} from '../models/search-item.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private resultsSearch = new BehaviorSubject<SearchCards[]>([]);
  public submit = new Subject<string>();
  constructor(private httpService: HttpService) {}
  ngOnInit() {}

  getResultSearch$() {
    return this.resultsSearch.asObservable();
  }

  set resultSearch$(val: SearchCards[]) {
    this.resultsSearch.next(val);
  }

  getSearchData(val: string) {
    return this.httpService.searchData(val);
  }

  getResultById(id: string): SearchCards | undefined {
    //console.log(this.submit);
    return this.resultsSearch.getValue().find((item) => item.id === id);
  }

  getDateById(id: string) {
    const card: SearchCards | undefined = this.resultsSearch
      .getValue()
      .find((item) => item.id === id);
    if (card && card.date !== null) {
      const year = new Date(card.date).getFullYear();
      const month = new Date(card.date).getMonth();
      const day = new Date(card.date).getDate();
      const weekday = new Date(card.date).getDay();
      let options: Options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      let date = new Date(year, month, day, weekday);
      let str: string = date.toLocaleDateString('en-US', options);
      return str;
    }
    return undefined;
  }
}
