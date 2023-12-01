import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser, User } from '../models/login.model.ts';
import { Store } from '@ngrx/store';
import { selectUser, selectUserData } from '../store/selectors/user.selectors';
import { UserActions } from '../store/actions/user.actions';
import { Options } from '../models/options.model';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  user$ = this.store.select(selectUserData);
  userId: string | null = '';
  userName: string | null = '';
  nextName: string = '';
  userEmail: string | null = '';
  date: Date | null = null;
  dateLong: string = '';
  isShown: boolean = false;
  button: string = 'edit';
  user!: AuthUser;

  constructor(
    private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef,
    private unsubscribe$: UnsubscribeService
  ) {
    //this.userData();
  }

  ngOnInit() {
    this.userData();
    //this.getUser();
  }
  getUser() {
    const str = localStorage.getItem('authUser');
    if (str !== null) {
      this.user = JSON.parse(str);
      this.store.dispatch(UserActions.getUser({ user: this.user }));
      //this.userData();
    }
  }
  userData() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      console.log(val);
      if (val !== null) {
        this.cd.markForCheck();
        this.userId = val.id;
        this.userEmail = val.email;
        this.userName = val.name;
        this.date = val.date;
        console.log(this.userName);
        console.log(this.date?.getFullYear());
        this.date !== null ? this.getDate(this.date) : '';
      } else {
        this.getUser();
      }
    });
  }

  onClick() {
    if (this.isShown) {
      this.userName = this.nextName;
      this.store.dispatch(UserActions.updateUser({ name: this.userName }));
      this.button = 'edit';
      this.isShown = false;
    } else {
      this.button = 'save';
      this.isShown = true;
    }
  }

  getDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekday = date.getDay();
    let options: Options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    let dateNew = new Date(year, month, day, weekday);
    let str: string = dateNew.toLocaleDateString('en-US', options);
    this.dateLong = str;
  }

  backMain() {
    this.router.navigate(['']);
  }

  reset() {
    //this.userName = this.previousName;
    this.isShown = false;
  }

  editName() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['signin']);
  }
}
