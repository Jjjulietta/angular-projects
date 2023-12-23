import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonFavoriteComponent } from './custom-button-favorite.component';

describe('CustomButtonFavoriteComponent', () => {
  let component: CustomButtonFavoriteComponent;
  let fixture: ComponentFixture<CustomButtonFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomButtonFavoriteComponent]
    });
    fixture = TestBed.createComponent(CustomButtonFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
