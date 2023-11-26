import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { limitPage } from '../../constants/constants';
import {
  CardsApiActions,
  cardsListsActions,
} from '../redux/actions/cards.actions';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Output() changeNumber = new EventEmitter<number>();
  limitPage: number = limitPage.limitPage;
  constructor(private store: Store) {}

  nextPage() {
    if (this.currentPage < this.limitPage) {
      this.currentPage += 1;
      this.changeNumber.emit(this.currentPage);
      this.store.dispatch(
        cardsListsActions.changePage({ token: this.currentPage.toString() })
      );
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.changeNumber.emit(this.currentPage);
      this.store.dispatch(
        cardsListsActions.changePage({ token: this.currentPage.toString() })
      );
    }
  }
}
