import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsItemComponent } from './search-results-item.component';

describe('SearchResultsItemComponent', () => {
  let component: SearchResultsItemComponent;
  let fixture: ComponentFixture<SearchResultsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemComponent]
    });
    fixture = TestBed.createComponent(SearchResultsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
