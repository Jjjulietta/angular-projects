import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingService } from '../../services/sorting.service';

import { FilterBlockComponent } from './filter-block.component';

describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;

  beforeEach(() => {
    let service: SortingService;
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
    });
    service = TestBed.inject(SortingService);
    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;

  beforeEach(() => {
    let service: SortingService;
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
    });
    service = TestBed.inject(SortingService);
    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#countSort should be "1" after #clickSortDate()', () => {
    component.countSort = 0;
    component.clickSortDate();
    //fixture.detectChanges();
    expect(component.countSort).toBe(1);
  });
  it('#countSort should be "0" after double #clickSortDate()', () => {
    component.countSort = 0;
    component.clickSortDate();
    component.clickSortDate();
    //fixture.detectChanges();
    expect(component.countSort).toBe(0);
  });
});

describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;

  beforeEach(() => {
    let service: SortingService;
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
    });
    service = TestBed.inject(SortingService);
    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#countSortView should be "1" after #clickSortViewDate()', () => {
    component.countSortView = 0;
    component.clickSortView();
    //fixture.detectChanges();
    expect(component.countSortView).toBe(1);
  });
  it('#countSortView should be "0" after #clickSortViewDate()', () => {
    component.countSortView = 1;
    component.clickSortView();
    //fixture.detectChanges();
    expect(component.countSortView).toBe(0);
  });
});

/*describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;

  beforeEach(() => {
    let service: SortingService;
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
    });
    service = TestBed.inject(SortingService);
    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#countSort should be "1" after #clickSortDate()', () => {
    component.countSort = 0;
    component.clickSortDate();
    //fixture.detectChanges();
    expect(component.countSort).toBe(1);
  });
  it('#countSort should be "0" after double #clickSortDate()', () => {
    component.countSort = 0;
    component.clickSortDate();
    component.clickSortDate();
    //fixture.detectChanges();
    expect(component.countSort).toBe(0);
  });
  it('#countSortView should be "1" after #clickSortViewDate()', () => {
    component.countSortView = 0;
    component.clickSortView();
    //fixture.detectChanges();
    expect(component.countSortView).toBe(1);
  });
  it('#countSortView should be "0" after #clickSortViewDate()', () => {
    component.countSortView = 1;
    component.clickSortView();
    //fixture.detectChanges();
    expect(component.countSortView).toBe(0);
  });
});*/
