import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from 'src/data/mock-data';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public resultsSearch: SearchItem[] = data;
  public submit = new Subject<string>();
  constructor() {}
}
