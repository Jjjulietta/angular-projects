import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  cardForm = this.fb.group({
    title: [''],
    description: [''],
    img: [''],
    link: [''],
    date: [Date],
    tags: this.fb.array([this.fb.control('')]),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cardForm = this.fb.group({
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
      date: [Date, [Validators.required, Validators.max(+new Date())]],
      tags: this.fb.array([this.fb.control('', [Validators.required])]),
    });
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
}
