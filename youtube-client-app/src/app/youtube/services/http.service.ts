import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  tap,
  map,
  mergeMap,
  throwError,
  catchError,
} from 'rxjs';
import { SearchItemVideo } from './../models/search-item.model';
import {
  SearchResponse,
  SearchResponseVideo,
} from './../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private SEARCH = 'search';
  private VIDEO = 'videos';
  private URL = 'https://www.googleapis.com/youtube/v3';
  private readonly LIMIT = 12;

  constructor(private httpClient: HttpClient) {}

  searchData(query: string): Observable<SearchItemVideo[]> {
    const params = new HttpParams()
      //.set('key', this.API_KEY)
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
            .get<SearchResponseVideo>(`${this.VIDEO}`, {
              params: {
                /*key: this.API_KEY,*/ id: v,
                part: 'snippet, statistics',
              },
            })
            .pipe(map((r) => r.items))
        ),
        //tap(console.log),
        //map((x) => console.log(x.statistics)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.error(
        error.error.error.message
        // `Backend returned code ${error.status}, body was: `,
        // error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
