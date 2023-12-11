import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, Observable, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ButtonUpdateComponent],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
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

  constructor(
    private store: Store,
    private unsubscribe$: UnsubscribeService,
    private service: HttpService,
    private toast: ToastService,
    private router: Router
  ) {
    //let userId = '';
    if (this.route.snapshot.paramMap.has('groupID')) {
      console.log('group');
      this.category = 'groupID';
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

    console.log(this.category);
    //const date = new Date().getTime();
    this.store.dispatch(
      MessagesActions.getMessages({ userId: this.id, token: this.category })
    );
    this.store
      .select(selectMessages)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val && val[this.id]) {
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
      });

    //this.messages = val[userId];
  }

  ngOnInit() {
    if (this.conversations || this.myGroup) this.isShown = true;
    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val !== null && val !== '') {
        console.log(val);
        this.toast.showToast(val, ToastState.Error);
      } else if (val !== null && val == '') {
        console.log(val);
        this.toast.showToast(ToastMessage.Error, ToastState.Error);
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

  updateMessages() {}

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
