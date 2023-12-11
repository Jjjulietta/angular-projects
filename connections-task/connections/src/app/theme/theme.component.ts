import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  isLightTheme!: boolean;

  ngOnInit() {
    if (localStorage.getItem('theme')) {
      let theme = localStorage.getItem('theme');
      if (theme !== null) this.isLightTheme = JSON.parse(theme);
    } else {
      this.isLightTheme = true;
    }
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }

  changeTheme() {
    console.log(this.isLightTheme);
    this.isLightTheme = !this.isLightTheme;
    localStorage.setItem('theme', JSON.stringify(this.isLightTheme));
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
