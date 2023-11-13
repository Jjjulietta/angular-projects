import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomCardsActions } from 'src/app/redux/actions/cards.actions';
import { SearchCards } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss'],
})
export class SearchResultsItemComponent {
  @Input() card?: SearchCards;

  date!: string | Date;

  constructor(private router: Router, private store: Store) {}
  ngOnInit() {
    if (this.card?.date && this.card.date !== null) this.date = this.card?.date;
  }

  openCard() {
    console.log(this.card?.id);
    this.router.navigate([`detailed/${this.card?.id}`]);
  }

  removeCard(cardId: string) {
    this.store.dispatch(CustomCardsActions.removeCard({ cardId }));
  }
}
