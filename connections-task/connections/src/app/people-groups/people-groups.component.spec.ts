import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGroupsComponent } from './people-groups.component';

describe('PeopleGroupsComponent', () => {
  let component: PeopleGroupsComponent;
  let fixture: ComponentFixture<PeopleGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PeopleGroupsComponent]
    });
    fixture = TestBed.createComponent(PeopleGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
