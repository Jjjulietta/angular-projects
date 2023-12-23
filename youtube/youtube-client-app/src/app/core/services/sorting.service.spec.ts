import { TestBed } from '@angular/core/testing';
import { first, take } from 'rxjs';
import { SortType } from '../enums/sort-type';

import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#getSortingState$() should return "asc" at first', () => {
    service
      .getSortingState$()
      .pipe(first())
      .subscribe((val) => expect(service.sort).toBe(SortType.Asc));
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#getSortingState$() should return "desc" at second', () => {
    service
      .getSortingState$()
      .pipe(take(2))
      .subscribe((val) => expect(service.sort).toBe(SortType.Desc));
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#getSortingViewState$() should return "asc" at first', () => {
    service
      .getSortinViewState$()
      .pipe(first())
      .subscribe((val) => expect(service.sortView).toBe(SortType.Asc));
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('#getSortingViewState$() should return "desc" at second', () => {
    service
      .getSortinViewState$()
      .pipe(take(2))
      .subscribe((val) => expect(service.sortView).toBe(SortType.Desc));
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#sortingState set #sort value', () => {
    service.sortingState$ = SortType.Asc;
    service.sort.subscribe((val) => expect(service.sort).toBe(SortType.Asc));
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#sortingViewState set #sortView value', () => {
    service.sortinViewState$ = SortType.Asc;
    service.sortView.subscribe((val) =>
      expect(service.sortView).toBe(SortType.Asc)
    );
  });
});

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });
  it('#wordState$ set #filterWord value', () => {
    service.wordState$ = 'sort';
    service.filterWord.subscribe((val) =>
      expect(service.filterWord).toBe('sort')
    );
  });
});

/*describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getSortingState$() should return "asc" at first', () => {
    service
      .getSortingState$()
      .pipe(first())
      .subscribe((val) => expect(service.sort).toBe(SortType.Asc));
  });
  it('#getSortingState$() should return "desc" at second', () => {
    service
      .getSortingState$()
      .pipe(take(2))
      .subscribe((val) => expect(service.sort).toBe(SortType.Desc));
  });
  it('#getSortingViewState$() should return "asc" at first', () => {
    service
      .getSortinViewState$()
      .pipe(first())
      .subscribe((val) => expect(service.sortView).toBe(SortType.Asc));
  });
  it('#getSortingViewState$() should return "desc" at second', () => {
    service
      .getSortinViewState$()
      .pipe(take(2))
      .subscribe((val) => expect(service.sortView).toBe(SortType.Desc));
  });
  it('#sortingState set #sort value', () => {
    service.sortingState$ = SortType.Asc;
    service.sort.subscribe((val) => expect(service.sort).toBe(SortType.Asc));
  });
  it('#sortingViewState set #sortView value', () => {
    service.sortinViewState$ = SortType.Asc;
    service.sortView.subscribe((val) =>
      expect(service.sortView).toBe(SortType.Asc)
    );
  });
  it('#wordState$ set #filterWord value', () => {
    service.wordState$ = 'sort';
    service.filterWord.subscribe((val) =>
      expect(service.filterWord).toBe('sort')
    );
  });
});*/
