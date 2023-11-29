export interface Login {
  email: string;
  password: string;
}

export interface Registration {
  email: string;
  name: string;
  password: string;
}

export interface AuthUser {
  token: string;
  uid: string;
  email: string;
}
