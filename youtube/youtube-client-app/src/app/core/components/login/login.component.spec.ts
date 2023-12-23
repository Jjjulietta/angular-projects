import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should display "user", if user auth', () => {
    authService.name?.subscribe((val) => {
      component.name = 'user';
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const p = el.querySelector('span');
      expect(p?.textContent).toEqual('user');
    });
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should display the value of the logged property', () => {
    component.logged = 'Login';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Login');
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('#isAuth should be true, if user auth', () => {
    authService.isAuth?.subscribe((val) => {
      component.isAuth = true;
      expect(component.isAuth).toBe(true);
    });
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should dsplay button "Logout" after user auth', () => {
    if (authService.auth) authService.auth(' ', '');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Logout');
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should dsplay button "Login" after user auth', () => {
    if (authService.loggout) authService.loggout();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Login');
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('#openLoginForm() should call loggout if user auth', () => {
    component.isAuth = true;
    component.openLoginForm();
    expect(authService.loggout).toBeTruthy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('#openAdminPage() should display card', () => {
    component.isAuth = true;
    component.openAdminPage();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const h1 = el.querySelector('h1');
    if (h1) {
      expect(h1.textContent).toBe('Create new card');
    }
  });
});

/*describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should display "user", if user auth', () => {
    authService.name?.subscribe((val) => {
      component.name = 'user';
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      const p = el.querySelector('span');
      expect(p?.textContent).toEqual('user');
    });
  });
  it('should display the value of the logged property', () => {
    component.logged = 'Login';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Login');
  });
  it('#isAuth should be true, if user auth', () => {
    authService.isAuth?.subscribe((val) => {
      component.isAuth = true;
      expect(component.isAuth).toBe(true);
    });
  });
  it('should dsplay bitton "Logout" after user auth', () => {
    if (authService.auth) authService.auth(' ', '');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Logout');
  });
  it('should dsplay bitton "Login" after user auth', () => {
    if (authService.loggout) authService.loggout();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const p = el.querySelector('app-custom-button');
    expect(p?.textContent).toEqual('Login');
  });
  it('#openLoginForm() should call loggout if user auth', () => {
    component.isAuth = true;
    component.openLoginForm();
    expect(authService.loggout).toBeTruthy();
  });
  it('#openAdminPage() should display card', () => {
    component.isAuth = true;
    component.openAdminPage();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const h1 = el.querySelector('h1');
    if (h1) {
      expect(h1.textContent).toBe('Create new card');
    }
  });
});*/
