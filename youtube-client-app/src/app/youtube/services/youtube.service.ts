import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
} from 'rxjs';
import { data } from 'src/data/mock-data';
import { Options } from '../models/option.model';
import { SearchItem, SearchItemVideo } from '../models/search-item.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public resultsSearch = new BehaviorSubject<SearchItemVideo[]>([]);
  public submit = new Subject<string>();
  cards!: SearchItemVideo[];
  constructor(private httpService: HttpService) {
    this.resultsSearch.subscribe((x) => {
      console.log(x);
      this.cards = x;
    });
  }
  ngOnInit() {}

  search(val: string) {
    return this.httpService.searchData(val);
    /*return this.submit.pipe(
      debounceTime(500),
      filter((val: string) => val.length > 3),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this.httpService.searchData(val);
      })
    );*/
  }

  getResultById(id: string): SearchItemVideo | undefined {
    console.log(this.submit);
    //if (this.submit) return (this.resultsSearch = data);
    // return undefined;
    return this.cards.find((item) => item.id === id);
  }

  getDateById(id: string) {
    const card: SearchItemVideo | undefined = this.cards.find(
      (item) => item.id === id
    );
    if (card) {
      const year = new Date(card.snippet.publishedAt).getFullYear();
      const month = new Date(card.snippet.publishedAt).getMonth();
      const day = new Date(card.snippet.publishedAt).getDate();
      const weekday = new Date(card.snippet.publishedAt).getDay();
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
