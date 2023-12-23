import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomCardsActions } from '../redux/actions/cards.actions';
import { SearchCards } from '../youtube/models/search-item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  private counter: number = 0;
  newCard!: SearchCards;
  cardForm = this.fb.group({
    id: [this.counter.toString()],
    title: [''],
    description: [''],
    img: [''],
    link: [''],
    date: [''],
    tags: this.fb.array([this.fb.control('')]),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.cardForm = this.fb.group({
      id: [this.counter.toString()],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', Validators.maxLength(255)],
      img: ['', [Validators.required]],
      link: ['', [Validators.required]],
      date: ['', [Validators.required, this.dateValidator()]],
      tags: this.fb.array([this.fb.control('', [Validators.required])]),
    });
  }

  get id() {
    return this.cardForm.get('id');
  }
  get title() {
    return this.cardForm.get('title');
  }

  get description() {
    return this.cardForm.get('description');
  }

  get img() {
    return this.cardForm.get('img');
  }

  get link() {
    return this.cardForm.get('link');
  }

  get date() {
    return this.cardForm.get('date');
  }

  get tags() {
    return this.cardForm.get('tags') as FormArray;
  }

  addTags() {
    this.tags.push(this.fb.control('', [Validators.required]));
  }

  resetAll() {
    this.cardForm.reset();
    while (this.tags.length > 1) {
      this.tags.removeAt(0);
    }
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl<Date>): ValidationErrors | null => {
      let dateNow = new Date();
      console.log(new Date(control.value));
      console.log(dateNow);
      const isDateValid = control.value
        ? new Date(control.value) < dateNow
        : false;
      if (!isDateValid) {
        return {
          forbiddenDate: 'The date is invalid',
        };
      }
      return null;
    };
  }

  createCard() {
    this.counter += 1;
    console.log(this.counter);
    if (this.cardForm.getRawValue() && this.cardForm.value.date !== null) {
      this.newCard = this.cardForm.getRawValue();
      Object.defineProperty(this.newCard, 'id', { value: this.counter });
      console.log(this.newCard);
      this.store.dispatch(CustomCardsActions.addCard({ card: this.newCard }));
    }
    this.resetAll();
    //this.router.navigate(['main']);
    //return newCard;.
  }
}
