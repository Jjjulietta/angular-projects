import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button-favorite.component.html',
  styleUrls: ['./custom-button-favorite.component.scss'],
})
export class CustomButtonFavoriteComponent {
  @Input() favorite!: string;
  @Input() custom!: string;
  /*changeColor() {
    if (this.favorite === 'inactive') {
      this.favorite = 'svg';
    } else if (this.favorite === 'svg') {
      this.favorite = 'inactive';
    }
  }*/
}
