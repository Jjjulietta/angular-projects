import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Message } from '../models/conversation.model';
import { selectMessages } from '../store/selectors/messages.selectors';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { MessagesActions } from '../store/actions/messages.actions';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { selectConversations } from '../store/selectors/conversations.selectors';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent {
  route = inject(ActivatedRoute);
  messages$ = this.store.select(selectMessages);
  messages!: Message[];
  text: string = '';
  message: string = 'message';
  conversationId!: string;
  category!: string | null;
  id!: string; //= this.route.snapshot.params['conversationID'];

  constructor(
    private store: Store,
    private unsubscribe$: UnsubscribeService,
    private service: HttpService,
    private router: Router
  ) {
    if (this.route.snapshot.paramMap.has('groupID')) {
      console.log('group');
      this.category = this.route.snapshot.paramMap.get('groupID');
      this.id = this.route.snapshot.params['groupID'];
    } else {
      console.log('conversations');
      this.category = this.route.snapshot.paramMap.get('conversationID');
      this.id = this.route.snapshot.params['conversationID'];
    }
    const userId = this.id.slice(1);
    const date = new Date().getTime();
    this.store.dispatch(MessagesActions.getMessages({ userId, date }));
    this.messages$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      if (val) this.messages = val[userId];
    });
  }

  sendMessage() {
    console.log(this.text);
    const userId = this.id.slice(1);
    //const date = new Date().getTime();

    this.service
      .sendMessage(userId, this.text)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => console.log(val));
    this.text = '';
  }
}
