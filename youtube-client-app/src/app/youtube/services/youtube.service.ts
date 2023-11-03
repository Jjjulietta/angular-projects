import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from 'src/data/mock-data';
import { Options } from '../models/option.model';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public resultsSearch: SearchItem[] = data;
  public submit = new Subject<string>();
  constructor() {}

  getResultById(id: string): SearchItem | undefined {
    console.log(this.submit);
    //if (this.submit) return (this.resultsSearch = data);
    // return undefined;
    return this.resultsSearch.find((item) => item.id === id);
  }

  getDateById(id: string) {
    const card: SearchItem | undefined = this.resultsSearch.find(
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
