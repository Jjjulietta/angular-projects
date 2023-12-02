import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast$ = new BehaviorSubject<boolean>(false);
  toastMessage$ = new BehaviorSubject<string>('');
  state$ = new BehaviorSubject<string>('');

  constructor() {}

  showToast(message: string, state: string) {
    this.showToast$.next(true);
    this.toastMessage$.next(message);
    this.state$.next(state);
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.showToast$.next(false);
  }
}
