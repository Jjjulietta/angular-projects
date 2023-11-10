import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map, mergeMap } from 'rxjs';
import { SearchItemVideo } from './../models/search-item.model';
import { SearchResponse } from './../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private SEARCH = 'search';
  private VIDEO = 'videos';
  private URL = 'https://www.googleapis.com/youtube/v3';
  private readonly LIMIT = 12;
  private API_KEY = 'AIzaSyB8zQEc9EzWukDP-CpmnKs6y93sA84B90Y';

  constructor(private httpClient: HttpClient) {}

  searchData(query: string): Observable<SearchItemVideo[]> {
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', this.LIMIT)
      .set('q', query);

    if (!query.trim) {
      return of([]);
    }

    return this.httpClient
      .get<SearchResponse>(`${this.SEARCH}`, { params })
      .pipe(
        tap((r) => console.log(r)),
        map((r) => r.items),
        map((x) => x.map((item) => item.id.videoId).join(',')),
        mergeMap((v) =>
          this.httpClient
            .get<SearchResponse>(`${this.VIDEO}`, {
              params: { key: this.API_KEY, id: v, part: 'snippet, statistics' },
            })
            .pipe(map((r) => r.items))
        ),
        tap(console.log)
        //map((x) => console.log(x.statistics)),
        //catchError(this.handleError)
      );
  }
}
