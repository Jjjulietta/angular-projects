import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Group } from '../models/group.model';
import { Store } from '@ngrx/store';
import { selectGroups } from '../store/selectors/groups.selectors';
import { GroupsActions } from '../store/actions/groups.action';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from '../services/unsubscribe.service';

@Component({
  selector: 'app-people-groups',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './people-groups.component.html',
  styleUrls: ['./people-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleGroupsComponent {
  groups$ = this.store.select(selectGroups);
  groups!: Group[];
  isShown: boolean = false;
  popapForm: FormGroup = new FormGroup({
    nameGroup: new FormControl('', { nonNullable: true }),
  });
  constructor(
    private router: Router,
    private store: Store,
    private service: HttpService,
    private unsubscribe$: UnsubscribeService
  ) {
    this.store.dispatch(GroupsActions.getGroups());
  }

  ngOnInit() {
    this.popapForm = new FormGroup({
      nameGroup: new FormControl('', [
        Validators.maxLength(30),
        //Validators.pattern('/'),
      ]),
    });
  }

  get nameGroup() {
    return this.popapForm.get('nameGroup');
  }

  openProfile() {
    this.router.navigate(['profile']);
  }

  updateGroups() {}

  createGroup() {
    this.isShown = true;
  }

  createGroupSubmit() {
    const name = this.popapForm.value.nameGroup;
    console.log(name);
    this.store.dispatch(GroupsActions.createGroup(name));
    this.groups$ = this.store.select(selectGroups);
  }
}
