import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectErrorGroup,
  selectGroups,
} from '../store/selectors/groups.selectors';
import { GroupsActions } from '../store/actions/groups.action';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { delay, interval, Observable, take, takeUntil } from 'rxjs';
import { UnsubscribeService } from '../services/unsubscribe.service';
import {
  selectPeople,
  selectUsersError,
} from '../store/selectors/people.selectors';
import { PeopleActions } from '../store/actions/people.actions';
import { ToastService } from '../services/toast.service';
import { ToastMessage, ToastState } from '../models/toast.model';
import { ToastComponent } from '../toast/toast.component';
import {
  selectCompanions,
  selectConversations,
  selectPeopleAuther,
  selectUserId,
} from '../store/selectors/conversations.selectors';
import { ConversationsActions } from '../store/actions/conversations.actions';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-people-groups',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ToastComponent],
  templateUrl: './people-groups.component.html',
  styleUrls: ['./people-groups.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleGroupsComponent {
  groups$ = this.store.select(selectGroups);
  users$ = this.store.select(selectPeople);
  people$ = this.store.select(selectPeopleAuther);
  errorGroup$ = this.store.select(selectErrorGroup);
  errorUsers$ = this.store.select(selectUsersError);

  companion$ = this.store.select(selectCompanions);
  conversationId!: string;
  context: string = 'group';
  disabled: boolean = false;
  disabledGroup: boolean = false;
  isShown: boolean = false;
  showPopap: boolean = false;
  userItem: string = 'user';
  timer: number | undefined;
  timer$!: Observable<number>;
  timerGroup: number | undefined;
  popapForm: FormGroup = new FormGroup({
    nameGroup: new FormControl('', { nonNullable: true }),
  });
  constructor(
    private router: Router,
    private store: Store,
    private service: HttpService,
    private unsubscribe$: UnsubscribeService,
    private toast: ToastService,
    private timerService: TimerService,
    private cd: ChangeDetectorRef
  ) {
    this.groups$.subscribe((val) => {
      if (val === null) {
        this.store.dispatch(GroupsActions.getGroups());
      }
    });
    this.users$.subscribe((val) => {
      if (val === null) {
        this.store.dispatch(PeopleActions.getPeople());
      }
    });

    this.companion$.subscribe((val) => {
      console.log(val);
      if (!val) {
        this.store.dispatch(ConversationsActions.getConversations());
      }
    });
    //this.timer$ = this.timerService.getTimer$();
  }

  ngOnInit() {
    this.cd.detectChanges();
    //this.timer$ = this.timerService.getTimer$();
    this.timerService
      .getDisablePeople$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.disabled = val));
    this.timerService
      .getTimerPeople$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        console.log(val);
        this.cd.markForCheck();
        //this.cd.detectChanges();
        this.timer = val;

        //this.cd.markForCheck();
      });

    this.timerService
      .getDisable$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (val) => {
          console.log(val);
          this.cd.markForCheck();
          this.disabledGroup = val;
          this.cd.detectChanges();
        },
      });
    this.timerService
      .getTimer$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (val) => {
          this.cd.markForCheck();
          this.timerGroup = val;
          this.cd.detectChanges();
        },
      });
    this.popapForm = new FormGroup({
      nameGroup: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[\p{L}\d\s]*$/iu),
      ]),
    });

    this.errorUsers$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val !== null) {
        this.timer = undefined;
        this.timerService.timerPeople$ = 0;
        this.disabled = false;
        this.timerService.disablePeople$ = false;
        if (val && val !== null && val !== '') {
          console.log(val);
          this.toast.showToast(val, ToastState.Error);
        } else if (val && val !== null && val == '') {
          console.log(val);
          this.toast.showToast(ToastMessage.Error, ToastState.Error);
        } else {
          this.toast.showToast(ToastMessage.Error, ToastState.Error);
        }
      }
    });
    this.errorGroup$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val !== null) {
        console.log(val);
        this.timerGroup = undefined;
        this.timerService.timer$ = 0;
        this.disabledGroup = false;
        this.timerService.disable$ = false;
        if (val && val !== null && val !== '') {
          console.log(val);
          this.toast.showToast(val, ToastState.Error);
        } else if (val && val !== null && val == '') {
          console.log(val);
          this.toast.showToast(ToastMessage.Error, ToastState.Error);
        } else {
          this.toast.showToast(ToastMessage.Error, ToastState.Error);
        }
      }
    });
  }

  showToast() {}

  get nameGroup() {
    return this.popapForm.get('nameGroup');
  }

  openProfile() {
    this.router.navigate(['profile']);
  }

  updateGroup() {
    this.disabledGroup = true;

    console.log(this.disabledGroup);
    this.timerService.disable$ = this.disabledGroup;
    console.log(this.timerGroup);
    this.timerGroup = 60;
    const sourse = interval(1000).pipe(take(60));
    this.store.dispatch(GroupsActions.getGroups());
    sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.cd.markForCheck();
      if (this.timerGroup) {
        this.timerGroup -= 1;
        this.timerService.timer$ = this.timerGroup;
        if (this.timerGroup === 0) {
          console.log(this.timer);
          this.disabledGroup = false;
          this.timerService.disable$ = false;
        }
        console.log(this.timerGroup);
        this.cd.detectChanges();
      }
    });
  }

  createGroup() {
    this.isShown = !this.isShown;
  }

  openPopap() {
    this.showPopap = !this.showPopap;
  }

  deleteGroup(id: string) {
    console.log(id);

    this.service
      .deleteGroup(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        console.log(val);
        if (val.ok) {
          console.log(val.status);
          this.showPopap = false;
          this.toast.showToast(ToastMessage.SucsessDelete, ToastState.Sucsess);
          this.store.dispatch(GroupsActions.deleteGroup({ groupId: id }));
        } else {
          console.log(val.statusText);
          this.toast.showToast(val.statusText, ToastState.Error);
        }
      });
  }

  updatePeople() {
    this.disabled = true;

    console.log(this.disabled);
    this.timerService.disablePeople$ = this.disabled;
    this.timer = 60;
    const sourse = interval(1000).pipe(take(60));
    this.store.dispatch(PeopleActions.getPeople());
    sourse.subscribe((val) => {
      this.cd.markForCheck();
      if (this.timer) {
        this.cd.detectChanges();
        this.timer -= 1;
        this.timerService.timerPeople$ = this.timer;
        if (this.timer === 0) {
          console.log(this.timer);
          this.disabled = false;
          this.timerService.disablePeople$ = false;
        }
        console.log(this.timer);
        this.cd.detectChanges();
      }
    });
  }

  createGroupSubmit() {
    const name: string = this.popapForm.value.nameGroup;
    console.log(name);
    this.store.dispatch(GroupsActions.createGroup({ name }));
    this.isShown = false;
  }

  getConversationId(userId: string) {
    console.log(userId);
    this.store
      .select(selectConversations)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        val?.forEach((item) => {
          if (item.companionID === userId) {
            this.conversationId = item.id;
            console.log(this.conversationId);
            this.router.navigate([`conversation/:${this.conversationId}`]);
          }
        });
      });
  }

  createConversation(userId: string) {
    this.store.dispatch(ConversationsActions.createConversations({ userId }));
    this.store
      .select(selectConversations)
      .pipe(takeUntil(this.unsubscribe$), delay(10000))
      .subscribe((val) => {
        console.log(val);
        val?.forEach((item) => {
          if (item.companionID === userId) {
            this.conversationId = item.id;
            this.router.navigate([`conversation/:${this.conversationId}`]);
          }
        });
      });
  }
}
