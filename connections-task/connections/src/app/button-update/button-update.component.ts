import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, auditTime, interval, take } from 'rxjs';

@Component({
  selector: 'app-button-update',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-update.component.html',
  styleUrls: ['./button-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonUpdateComponent {
  cliced: boolean = false;
  disabled: boolean = false;
  timer: number = 59;
  @Input() context?: string;

  constructor(private cd: ChangeDetectorRef) {}

  update() {
    this.disabled = true;
    this.cliced = true;
    console.log(this.disabled);

    const click = fromEvent(document, 'click');
    click.pipe(auditTime(60000)).subscribe(() => {
      this.cd.markForCheck();
      this.cliced = false;
      this.disabled = false;
    });
    const sourse = interval(1000).pipe(take(59));
    sourse.subscribe((val) => {
      this.cd.markForCheck();
      this.timer -= 1;
    });
  }
}
