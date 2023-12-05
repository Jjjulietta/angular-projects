import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Group } from '../models/group.model';
import { Store } from '@ngrx/store';
import {
  selectErrorGroup,
  selectGroups,
} from '../store/selectors/groups.selectors';
import { GroupsActions } from '../store/actions/groups.action';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../services/http.service';
import {
  audit,
  auditTime,
  fromEvent,
  generate,
  interval,
  mergeMap,
  Observable,
  take,
  takeUntil,
} from 'rxjs';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { UserModel } from '../models/people.model';
import { selectPeople } from '../store/selectors/people.selectors';
import { PeopleActions } from '../store/actions/people.actions';
import { ToastService } from '../services/toast.service';
import { ToastMessage, ToastState } from '../models/toast.model';
import { ToastComponent } from '../toast/toast.component';
import { initialState } from '../store/reducers/user.reduser';
import {
  selectCompanions,
  selectConversations,
  selectPeopleAuther,
  selectUserId,
} from '../store/selectors/conversations.selectors';
import { ConversationsActions } from '../store/actions/conversations.actions';

@Component({
  selector: 'app-people-groups',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ToastComponent],
  templateUrl: './people-groups.component.html',
  styleUrls: ['./people-groups.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleGroupsComponent {
  groups$ = this.store.select(selectGroups);
  //groups!: Group[];
  users$ = this.store.select(selectPeople);
  people$ = this.store.select(selectPeopleAuther);
  //people!: UserModel[];
  error$ = this.store.select(selectErrorGroup);
  companion$ = this.store.select(selectCompanions);
  conversationId!: string;
  isShown: boolean = false;
  cliced: boolean = false;
  disabled: boolean = false;
  timer!: Observable<number>;
  userItem: string = 'user';
  popapForm: FormGroup = new FormGroup({
    nameGroup: new FormControl('', { nonNullable: true }),
  });
  constructor(
    private router: Router,
    private store: Store,
    private service: HttpService,
    private unsubscribe$: UnsubscribeService,
    private toast: ToastService,
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
  }

  ngOnInit() {
    this.popapForm = new FormGroup({
      nameGroup: new FormControl('', [
        Validators.maxLength(30),
        //Validators.pattern('/'),
      ]),
    });

    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val !== null) {
        this.toast.showToast(val, ToastState.Error);
      }
    });
  }

  get nameGroup() {
    return this.popapForm.get('nameGroup');
  }

  openProfile() {
    this.router.navigate(['profile']);
  }

  updateGroups() {
    this.disabled = true;
    this.cliced = true;

    /*result.subscribe(
      {
      next: (value) => {
        this.timer = value;
        console.log(this.timer);
      },
      complete: () => console.log('Complete!'),
    }
    );*/

    const click = fromEvent(document, 'click');
    click.pipe(auditTime(6000)).subscribe(() => {
      this.cliced = false;
      this.disabled = false;
    });

    /*const sourse = interval(1000).pipe(take(4));
    sourse.subscribe((val) => (this.timer = val));*/
    this.timer = generate({
      initialState: 6000,
      condition: (x) => x >= 0,
      iterate: (x) => x - 1000,
      resultSelector: (x: number) => x,
    });
    //source.subscribe((val) => (this.timer = val));
  }

  createGroup() {
    this.isShown = true;
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
          this.toast.showToast(ToastMessage.SucsessDelete, ToastState.Sucsess);
          this.store.dispatch(GroupsActions.deleteGroup({ groupId: id }));
        } else {
          console.log(val.statusText);
          this.toast.showToast(val.statusText, ToastState.Error);
        }
      });
  }

  updatePeople() {}

  createGroupSubmit() {
    const name: string = this.popapForm.value.nameGroup;
    console.log(name);
    this.store.dispatch(GroupsActions.createGroup({ name }));
    this.isShown = false;
    //this.cd.markForCheck();
    //this.groups$.subscribe((val)=> ) = this.store.select(selectGroups);
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        val?.forEach((item) => {
          if (item.companionID === userId) {
            this.conversationId = item.id;
            this.router.navigate([`conversation/:${this.conversationId}`]);
          }
        });
      });
  }
}
