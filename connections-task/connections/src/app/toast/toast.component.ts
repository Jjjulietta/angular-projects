import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [animate('500ms')]),
    ]),
  ],
})
export class ToastComponent {
  toastMessage!: string;
  show!: boolean;
  toast!: string;

  constructor(public toastService: ToastService) {}
}
