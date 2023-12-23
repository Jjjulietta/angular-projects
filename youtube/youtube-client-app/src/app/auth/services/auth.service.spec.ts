import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be created an object in LS after user auth', () => {
    service.auth('', '');
    expect(localStorage.getItem('user')).toBeDefined();
  });
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('#isAuth should be true after user auth', () => {
    service.auth('', '');
    service.isAuth.subscribe(() => expect(service.isAuth).toBe(true));
  });
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('#name should be "User" after user auth', () => {
    service.auth('', '');
    service.name.subscribe(() => expect(service.name).toBe('User'));
  });
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('#isAuth should be "false" after user loggout', () => {
    service.loggout();
    service.isAuth.subscribe(() => expect(service.isAuth).toBe(false));
  });
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });
  it('#logged should be "Login" after user loggout', () => {
    service.loggout();
    service.logged.subscribe(() => expect(service.logged).toBe('Login'));
  });
});

/* describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be created an object in LS after user auth', () => {
    service.auth('', '');
    expect(localStorage.getItem('user')).toBeDefined();
  });
  it('#isAuth should be true after user auth', () => {
    service.auth('', '');
    service.isAuth.subscribe(() => expect(service.isAuth).toBe(true));
  });
  it('#name should be "User" after user auth', () => {
    service.auth('', '');
    service.name.subscribe(() => expect(service.name).toBe('User'));
  });
  it('#isAuth should be "false" after user loggout', () => {
    service.loggout();
    service.isAuth.subscribe(() => expect(service.isAuth).toBe(false));
  });
  it('#logged should be "Login" after user loggout', () => {
    service.loggout();
    service.logged.subscribe(() => expect(service.logged).toBe('Login'));
  });
});*/
