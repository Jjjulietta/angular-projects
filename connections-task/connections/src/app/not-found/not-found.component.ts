import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  path!: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.checkAuth()) {
      this.path = 'main';
    } else {
      this.path = 'signin';
    }
  }
}
