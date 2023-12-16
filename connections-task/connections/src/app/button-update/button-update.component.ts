import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, take, takeUntil, Observable } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { UnsubscribeService } from '../services/unsubscribe.service';

@Component({
  selector: 'app-button-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-update.component.html',
  styleUrls: ['./button-update.component.scss'],
  // providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonUpdateComponent {
  cliced!: boolean;
  disabledGroup: boolean = false;
  disabled: boolean = false;
  disabledConversation: boolean = false;
  //timer?: number;
  timerGroup?: number;
  timerConversation?: number;
  startTimer!: Observable<number>;
  @Input() context?: string;
  @Input() timer?: number;
  @Output() onUpdate = new EventEmitter<number>();
  @Output() onUpdateGroup = new EventEmitter<number>();
  @Output() onUpdateConversation = new EventEmitter<number>();

  constructor(
    private cd: ChangeDetectorRef,
    private timerSevice: TimerService,
    private unsubscribe$: UnsubscribeService
  ) {}

  ngOnInit() {
    console.log(this.context);
    console.log(this.disabledGroup);
    if (this.context === 'group') {
      this.timerSevice
        .getDisable$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.cd.markForCheck();
            this.disabled = val;
            console.log(this.disabled);
            this.cd.detectChanges();
          },
        });
      this.timerSevice
        .getTimer$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            this.cd.markForCheck();
            this.timer = val;
            this.cd.detectChanges();
          },
        });
    }
    if (this.context === 'groupID') {
      this.timerSevice
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
      this.timerSevice
        .getTimerGroup$()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (val) => {
            this.cd.markForCheck();
            this.timer = val;
            this.cd.detectChanges();
          },
        });
    }

    if (this.context === 'conversation') {
      this.timerSevice
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
      this.timerSevice
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
  }

  update() {
    console.log(this.context);
    this.onUpdate.emit(this.timer);
    this.disabled = true;
    this.cliced = true;
    console.log(this.disabled);
    this.timerSevice.clicked$ = this.cliced;
    this.timerSevice.disable$ = this.disabled;
    console.log(this.timer);
    // this.timer = 59;
    const sourse = interval(1000).pipe(take(59));
    sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.cd.markForCheck();
      if (this.timer) {
        this.timer -= 1;
        this.timerSevice.timer$ = this.timer;
        if (this.timer === 0) {
          console.log(this.timer);
          this.disabled = false;
          this.cliced = false;
          this.timerSevice.clicked$ = false;
          this.timerSevice.disable$ = false;
        }
        console.log(this.timer);
        this.cd.detectChanges();
      }
    });
  }

  updateGroup() {
    console.log(this.context);
    this.onUpdateGroup.emit(this.timer);
    this.disabledGroup = true;
    this.cliced = true;
    console.log(this.disabledGroup);
    this.timerSevice.clicked$ = this.cliced;
    /*if (this.context === 'group') {*/
    this.timerSevice.disableGroup$ = this.disabledGroup;
    this.timerGroup = 59;
    const sourse = interval(1000).pipe(take(59));
    sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.cd.markForCheck();
      if (this.timerGroup) {
        this.timerGroup -= 1;
        this.timerSevice.timerGroup$ = this.timerGroup;
        if (this.timerGroup === 0) {
          console.log(this.timerGroup);
          this.disabledGroup = false;
          this.cliced = false;
          this.timerSevice.clicked$ = false;
          this.timerSevice.disableGroup$ = false;
        }
        console.log(this.timerGroup);
        this.cd.detectChanges();
      }
    });
  }

  updateConversation() {
    console.log(this.context);
    this.onUpdateConversation.emit(this.timer);
    this.disabledConversation = true;
    this.cliced = true;
    console.log(this.disabledConversation);
    this.timerSevice.clicked$ = this.cliced;
    /*if (this.context === 'group') {*/
    this.timerSevice.disableConversation$ = this.disabledConversation;

    this.timerConversation = 59;
    const sourse = interval(1000).pipe(take(59));
    sourse.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.cd.markForCheck();
      if (this.timerConversation) {
        this.timerConversation -= 1;
        this.timerSevice.timerConversation$ = this.timerConversation;
        if (this.timerConversation === 0) {
          console.log(this.timerConversation);
          this.disabledConversation = false;
          this.cliced = false;
          this.timerSevice.clicked$ = false;
          this.timerSevice.disableConversation$ = false;
        }
        console.log(this.timerConversation);
        this.cd.detectChanges();
      }
    });
  }
}
