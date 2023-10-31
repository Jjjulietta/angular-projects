import { Component } from '@angular/core';
import { data } from 'src/data/mock-data';
import { SearchItem } from './youtube/models/search-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public shown = false;
  public sort = '';
  public sortView = '';
  public word = '';
  public submit = '';
  public resultsSearch: SearchItem[] = [];

  toggleFilter(shown: boolean) {
    this.shown = shown;
  }

  toggleSort(sort: string) {
    this.sort = sort;
    console.log(this.sort);
  }

  toggleSortView(sortView: string) {
    console.log(sortView);
    this.sortView = sortView;
    console.log(this.sortView);
  }

  inputWord(word: string) {
    console.log(word);
    this.word = word;
  }

  downloadResults(submit: string) {
    if (submit) this.resultsSearch = data;
  }
}
