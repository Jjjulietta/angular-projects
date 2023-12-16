import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../models/login.model.ts';
import { Store } from '@ngrx/store';
import {
  selectUserData,
  selectUserError,
} from '../store/selectors/user.selectors';
import { UserActions } from '../store/actions/user.actions';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { takeUntil } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ToastMessage, ToastState } from '../models/toast.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  user$ = this.store.select(selectUserData);
  userId: string | null = '';
  userName: string | null = '';
  error = this.store.select(selectUserError);
  nextName: string = '';
  userEmail: string | null = '';
  date: Date | null = null;
  isShown: boolean = false;
  button: string = 'edit';
  user!: AuthUser;
  disable: boolean = false;
  formName = this.fb.group({ name: [''] });

  constructor(
    private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef,
    private unsubscribe$: UnsubscribeService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userData();

    this.formName = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\p{L}\s]*$/u),
          Validators.maxLength(40),
        ],
      ],
    });
    this.error.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val && val !== null && val !== '') {
        console.log(val);
        this.toast.showToast(val, ToastState.Error);
      } else if (val && val !== null && val == '') {
        console.log(val);
        this.toast.showToast(ToastMessage.Error, ToastState.Error);
      } else {
        this.toast.showToast(ToastMessage.Error, ToastState.Error);
      }
    });
  }

  get name() {
    return this.formName.get('name');
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
      } else {
        this.getUser();
      }
    });
  }

  onClick() {
    if (this.isShown) {
      if (this.formName.value.name) {
        this.nextName = this.formName.value.name;
        this.userName = this.nextName;
        this.store.dispatch(UserActions.addUser({ name: this.userName }));
        this.button = 'edit';
        this.isShown = false;
      }
    } else {
      this.button = 'save';
      this.isShown = true;
    }
  }

  backMain() {
    this.router.navigate(['']);
  }

  reset() {
    this.isShown = false;
  }

  editName() {}

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
    this.router.navigate(['signin']);
  }
}
