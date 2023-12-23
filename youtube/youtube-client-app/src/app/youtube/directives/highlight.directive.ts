import { Directive, ElementRef, Input } from '@angular/core';
import { period, colors } from 'src/constants/constants';
import { SearchCards } from '../models/search-item.model';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() card?: SearchCards;

  @Input() date?: string | Date;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'blue';
  }

  ngOnChanges() {
    if (this.date) {
      const time =
        (+new Date() - new Date(this.date).getTime()) / (1000 * 60 * 60 * 24);
      if (time > period.sixMonth) {
        this.highlight(colors.red);
      }
      if (time > period.month && time < period.sixMonth) {
        this.highlight(colors.yellow);
      }
      if (time >= period.sevenDay && time < period.month) {
        this.highlight(colors.green);
      }
      if (time < period.sevenDay) {
        this.highlight(colors.blue);
      }
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
