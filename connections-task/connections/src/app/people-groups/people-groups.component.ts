import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-groups.component.html',
  styleUrls: ['./people-groups.component.scss'],
})
export class PeopleGroupsComponent {
  constructor(private router: Router) {}

  openProfile() {
    this.router.navigate(['profile']);
  }
}
