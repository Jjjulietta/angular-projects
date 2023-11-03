import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItem } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss'],
})
export class SearchResultsItemComponent {
  @Input() card?: SearchItem;

  date?: string;

  constructor(private router: Router) {}
  ngOnInit() {
    if (this.card) this.date = this.card?.snippet.publishedAt;
  }

  openCard() {
    console.log(this.card?.id);
    this.router.navigate([`detailed/${this.card?.id}`]);
  }
}
