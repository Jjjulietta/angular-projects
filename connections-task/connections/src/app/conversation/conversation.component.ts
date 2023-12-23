import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, interval, Observable, take, takeUntil } from 'rxjs';
import { Message } from '../models/conversation.model';
import {
  selectMessageError,
  selectMessages,
} from '../store/selectors/messages.selectors';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { MessagesActions } from '../store/actions/messages.actions';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import {
  selectCompanions,
  selectConversations,
} from '../store/selectors/conversations.selectors';
import { selectPeople, selectUsers } from '../store/selectors/people.selectors';
import { ButtonUpdateComponent } from '../button-update/button-update.component';
import { selectGroups } from '../store/selectors/groups.selectors';
import { GroupsActions } from '../store/actions/groups.action';
import { PeopleActions } from '../store/actions/people.actions';
import { ConversationsActions } from '../store/actions/conversations.actions';
import { ToastService } from '../services/toast.service';
import { ToastState, ToastMessage } from '../models/toast.model';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ButtonUpdateComponent],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [TimerService],
})
export class ConversationComponent {
  route = inject(ActivatedRoute);
  messages$ = this.store.select(selectMessages);
  people$ = this.store.select(selectPeople);
  names$ = this.store.select(selectUsers);
  error$ = this.store.select(selectMessageError);
  myGroup: boolean = false;
  namesUser: string = '';
  messages!: Message[];
  text: string = '';
  message: string = 'message';
  context: string = 'conversation';
  group: boolean = false;
  conversations: boolean = false;
  isShown: boolean = false;
  showPopap: boolean = false;
  conversationId!: string;
  category!: string;
  date!: number;
  id!: string; //= this.route.snapshot.params['conversationID'];
  disabledGroup: boolean = false;
  disabledConversation: boolean = false;
  timerGroup?: number;
  timerConversation?: number;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private unsubscribe$: UnsubscribeService,
    private service: HttpService,
    private toast: ToastService,
    private timerService: TimerService,
    private router: Router
  ) {
    //let userId = '';
    /* if (this.route.snapshot.paramMap.has('groupID')) {
      console.log('group');
      this.category = 'groupID';
      this.context = 'groupID';
      this.group = true;
      //this.category = this.route.snapshot.paramMap.get('groupID');

      let userId = this.route.snapshot.params['groupID'];
      const i = userId.indexOf(',');
      this.id = userId.slice(1, i);
      const my = userId.slice(i + 1);
      if (my === 'true') {
        console.log('true');
        this.myGroup = true;
      }
      console.log(this.id);
    } else {
      console.log('conversations');
      this.category = 'conversationID';
      this.context = 'conversation';
      this.conversations = true;

      //this.category = this.route.snapshot.paramMap.get('conversationID');
      let userId = this.route.snapshot.params['conversationID'];
      this.id = userId.slice(1);
    }

    this.store.select(selectGroups).subscribe((val) => {
      if (val === null) {
        this.store.dispatch(GroupsActions.getGroups());
      }
    });
    this.store.select(selectPeople).subscribe((val) => {
      if (val === null) {
        this.store.dispatch(PeopleActions.getPeople());
      }
    });
    this.store.select(selectCompanions).subscribe((val) => {
      console.log(val);
      if (!val) {
        this.store.dispatch(ConversationsActions.getConversations());
      }
    });

    this.messages$
      .pipe(takeUntil(this.unsubscribe$), delay(3000))
      .subscribe((val) => {
        console.log(val);
        console.log(this.id);
        if (val !== null) {
          console.log(val[this.id]);
        }
        if (val === null || val[this.id] === undefined) {
          console.log(val);
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }
      });

    /*this.store
      .select(selectMessages)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val === null) {
          console.log(val);
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }
      });*/
    console.log(this.category);
    //const date = new Date().getTime();
    /*this.store.dispatch(
      MessagesActions.getMessages({ userId: this.id, token: this.category })
    );*/
    /*this.store
      .select(selectMessages)
      .pipe(takeUntil(this.unsubscribe$), delay(3000))
      .subscribe((val) => {
        console.log(val);
        if (val) {
          if (val && val[this.id] && val[this.id].length !== 0) {
            this.cd.markForCheck();
            console.log(this.id);
            //console.log(userId);
            console.log(val);
            console.log(val[this.id]);
            const l = val[this.id].length;
            this.date = +val[this.id][l - 1].createdAt;
            console.log(this.date);
            const messagesUsers = val[this.id];
            this.names$.pipe(takeUntil(this.unsubscribe$)).subscribe(
              (values) =>
                (this.messages = messagesUsers
                  .map((item) => ({ ...item }))
                  .map((i) =>
                    Object.defineProperty(i, 'authorID', {
                      value: values![i.authorID],
                    })
                  ))
            );
          }
        } /*else {
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }*/
    //});

    //this.messages = val[userId];
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('groupID')) {
      console.log('group');
      this.category = 'groupID';
      this.context = 'groupID';
      this.group = true;
      //this.category = this.route.snapshot.paramMap.get('groupID');

      let userId = this.route.snapshot.params['groupID'];
      const i = userId.indexOf(',');
      this.id = userId.slice(1, i);
      const my = userId.slice(i + 1);
      if (my === 'true') {
        console.log('true');
        this.myGroup = true;
      }
      console.log(this.id);
    } else {
      console.log('conversations');
      this.category = 'conversationID';
      this.context = 'conversation';
      this.conversations = true;

      //this.category = this.route.snapshot.paramMap.get('conversationID');
      let userId = this.route.snapshot.params['conversationID'];
      console.log(userId);
      this.id = userId.slice(1);
      console.log(this.id);
    }

    this.store
      .select(selectGroups)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val === null) {
          this.store.dispatch(GroupsActions.getGroups());
        }
      });
    this.store
      .select(selectPeople)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val === null) {
          this.store.dispatch(PeopleActions.getPeople());
        }
      });
    this.store
      .select(selectCompanions)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        console.log(val);
        if (!val) {
          this.store.dispatch(ConversationsActions.getConversations());
        }
      });

    this.messages$
      .pipe(takeUntil(this.unsubscribe$), delay(3000))
      .subscribe((val) => {
        console.log(val);
        console.log(this.id);
        if (val !== null) {
          console.log(val[this.id]);
        }
        if (val === null || val[this.id] === undefined) {
          console.log(val);
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }
      });

    /*this.store
      .select(selectMessages)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val === null) {
          console.log(val);
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }
      });*/
    console.log(this.category);
    //const date = new Date().getTime();
    /*this.store.dispatch(
      MessagesActions.getMessages({ userId: this.id, token: this.category })
    );*/
    this.store
      .select(selectMessages)
      .pipe(takeUntil(this.unsubscribe$), delay(3000))
      .subscribe((val) => {
        console.log(val);
        if (val) {
          if (val && val[this.id] && val[this.id].length !== 0) {
            this.cd.markForCheck();
            console.log(this.id);
            //console.log(userId);
            console.log(val);
            console.log(val[this.id]);
            const l = val[this.id].length;
            this.date = +val[this.id][l - 1].createdAt;
            console.log(this.date);
            const messagesUsers = val[this.id];
            this.names$.pipe(takeUntil(this.unsubscribe$)).subscribe(
              (values) =>
                (this.messages = messagesUsers
                  .map((item) => ({ ...item }))
                  .map((i) =>
                    Object.defineProperty(i, 'authorID', {
                      value: values![i.authorID],
                    })
                  ))
            );
          }
        } /*else {
          this.store.dispatch(
            MessagesActions.getMessages({
              userId: this.id,
              token: this.category,
            })
          );
        }*/
      });

    //this.messages = val[userId];
    if (this.context === 'groupID') {
      this.timerService
        .getDisableGroup$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.cd.markForCheck();
            this.disabledGroup = val;
            console.log(this.disabledGroup);
            this.cd.detectChanges();
          },
        });
      this.timerService
        .getTimerGroup$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            this.cd.markForCheck();
            this.timerGroup = val;
            this.cd.detectChanges();
          },
        });
    }

    if (this.context === 'conversation') {
      this.timerService
        .getDisableConversation$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.cd.markForCheck();
            this.disabledConversation = val;
            console.log(this.disabledConversation);
            this.cd.detectChanges();
          },
        });
      this.timerService
        .getTimerConversation$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            this.cd.markForCheck();
            this.timerConversation = val;
            this.cd.detectChanges();
          },
        });
    }
    if (this.conversations || this.myGroup) this.isShown = true;
    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val !== null) {
        if (this.timerGroup) {
          this.timerGroup = undefined;
          this.timerService.timerGroup$ = 0;
          this.disabledGroup = false;
          this.timerService.disableGroup$ = false;
        } else if (this.timerConversation) {
          this.timerConversation = undefined;
          this.disabledConversation = false;
          this.timerService.disableConversation$ = false;
          this.timerService.timerConversation$ = 0;
        }
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

  sendMessage() {
    console.log(this.text);
    const message = this.text;
    const token = this.category;
    if (token !== null)
      this.service
        .sendMessage(this.id, message, token)
        .pipe(takeUntil(this.unsubscribe$), delay(2000))
        .subscribe((val) => {
          console.log(val);
          this.store.dispatch(
            MessagesActions.createMessages({
              userId: this.id,
              token: this.category,
              date: this.date,
            })
          );
        });
    this.text = '';
    console.log(this.date);
  }

  updateMessages() {
    console.log(this.category);
    console.log(this.date);
    this.store.dispatch(
      MessagesActions.updateMessages({
        userId: this.id,
        token: this.category,
        date: this.date,
      })
    );
    if (this.context === 'groupID') {
      this.disabledGroup = true;
      this.timerService.disableGroup$ = this.disabledGroup;
      this.timerGroup = 60;
      const sourse = interval(1000).pipe(take(60));
      sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
        this.cd.markForCheck();
        if (this.timerGroup) {
          this.timerGroup -= 1;
          this.timerService.timerGroup$ = this.timerGroup;
          if (this.timerGroup === 0) {
            console.log(this.timerGroup);
            this.disabledGroup = false;

            this.timerService.disableGroup$ = false;
          }
          console.log(this.timerGroup);
          this.cd.detectChanges();
        }
      });
    }
    if (this.context === 'conversation') {
      this.disabledConversation = true;
      this.timerService.disableConversation$ = this.disabledConversation;

      this.timerConversation = 60;
      const sourse = interval(1000).pipe(take(60));
      sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
        this.cd.markForCheck();
        if (this.timerConversation) {
          this.timerConversation -= 1;
          this.timerService.timerConversation$ = this.timerConversation;
          if (this.timerConversation === 0) {
            console.log(this.timerConversation);
            this.disabledConversation = false;
            this.timerService.disableConversation$ = false;
          }
          console.log(this.timerConversation);
          this.cd.detectChanges();
        }
      });
    }
  }

  openPopap() {
    this.showPopap = !this.showPopap;
  }

  delete(id: string) {
    console.log(id);

    if (this.category === 'groupID') {
      this.service
        .deleteGroup(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          console.log(val);
          if (val.ok) {
            console.log(val.status);
            this.toast.showToast(
              ToastMessage.SucsessDelete,
              ToastState.Sucsess
            );
            this.store.dispatch(GroupsActions.deleteGroup({ groupId: id }));
            this.router.navigate(['/']);
          } else {
            console.log(val.statusText);
            this.toast.showToast(val.statusText, ToastState.Error);
          }
        });
    } else if (this.category === 'conversationID') {
      this.service
        .deleteConversations(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          console.log(val);
          if (val.ok) {
            console.log(val.status);
            this.toast.showToast(
              ToastMessage.SucsessDeleteConv,
              ToastState.Sucsess
            );
            this.store.dispatch(
              ConversationsActions.deleteConversation({ convId: id })
            );
            this.router.navigate(['/']);
          } else {
            console.log(val.statusText);
            this.toast.showToast(val.statusText, ToastState.Error);
          }
        });
    }
  }
}
