import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { SearchItemVideo } from 'src/app/youtube/models/search-item.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string | null = null;
  search: string = '';
  subscription$ = new Subject<void>();
  /*searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });*/
  constructor(private router: Router, private youtubeService: YoutubeService) {}

  ngOnInit() {
    /*this.searchForm.controls['search'].valueChanges.subscribe(
      (val) => {
        if (debounceTime(600) && val.length > 3 && distinctUntilChanged()) {
          console.log(val);
          this.YoutubeService.submit.next(val);
        }
      }

      //tap((val) => console.log(val) /*this.YoutubeService.submit.next(val)*/
  }

  onChange() {
    if (debounceTime(600) && this.search.length > 3 && distinctUntilChanged()) {
      console.log(this.search);
      this.youtubeService
        .search(this.search)
        .pipe(takeUntil(this.subscription$))
        .subscribe((val) => {
          console.log(val);
          this.youtubeService.resultsSearch.next(val);
        });
    }
  }
  /*ngOnChange(text: string) {
    this.inputText = text;
    if (this.inputText !== null) {
      this.YoutubeService.submit.next(this.inputText);
      console.log(this.inputText);
      this.router.navigate(['main']);
    }
  }*/

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
