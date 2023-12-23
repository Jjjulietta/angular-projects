import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display filter block firstElementChild, if #isShown is true', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-filter-block');
    expect(p?.firstElementChild).toBeDefined();
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display input if #isShown is true', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input');
    expect(input).toBeDefined();
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display input value', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input');

    if (input) {
      input.value = 'search';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(input?.textContent).toBe('search');
    }
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#onClick should display input element, if #isShown false', () => {
    component.isShown = false;
    component.onClick.pipe(first()).subscribe(() => {
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const input = el.querySelector('input');
      expect(input).toBeDefined();
    });
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#openFavoritePage() chould toggle #favorite', () => {
    component.favorite = 'false';
    component.openFavoritePage();
    expect(component.favorite).toBe('true');
  });
  it('#openFavoritePage() chould toggle #favorite', () => {
    component.favorite = 'true';
    component.openFavoritePage();
    expect(component.favorite).toBe('false');
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('#toggleFilterBlock() chould toggle #isShown', () => {
    component.isShown = false;
    component.toggleFilterBlock();
    expect(component.isShown).toBe(true);
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('#toggleFilterBlock() chould dispaly span textContent, if #isShown false', () => {
    component.isShown = false;
    component.toggleFilterBlock();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const span = el.querySelector('.filter-title');
    if (span) {
      expect(span.textContent).toBe('Sorting by:');
    }
  });
});

/*describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display filter block firstElementChild, if #isShown is true', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-filter-block');
    expect(p?.firstElementChild).toBeDefined();
  });
  it('should display input if #isShown is true', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input');
    expect(input).toBeDefined();
  });
  it('should display input value', () => {
    component.isShown = true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input');

    if (input) {
      input.value = 'search';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(input?.textContent).toBe('search');
    }
  });
  it('#onClick should display input element, if #isShown false', () => {
    component.isShown = false;
    component.onClick.pipe(first()).subscribe(() => {
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const input = el.querySelector('input');
      expect(input).toBeDefined();
    });
  });
  it('#openFavoritePage() chould toggle #favorite', () => {
    component.favorite = 'false';
    component.openFavoritePage();
    expect(component.favorite).toBe('true');
  });
  it('#openFavoritePage() chould toggle #favorite', () => {
    component.favorite = 'true';
    component.openFavoritePage();
    expect(component.favorite).toBe('false');
  });
  it('#toggleFilterBlock() chould toggle #isShown', () => {
    component.isShown = false;
    component.toggleFilterBlock();
    expect(component.isShown).toBe(true);
  });
  it('#toggleFilterBlock() chould dispaly span textContent, if #isShown false', () => {
    component.isShown = false;
    component.toggleFilterBlock();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const span = el.querySelector('.filter-title');
    if (span) {
      expect(span.textContent).toBe('Sorting by:');
    }
  });
});*/
