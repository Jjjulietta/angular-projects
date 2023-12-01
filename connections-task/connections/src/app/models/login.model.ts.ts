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

export interface User {
  id: string | null;
  email: string | null;
  date: Date | null;
  name: string | null;
}

export interface UserProfile {
  email: { S: string };
  name: { S: string };
  uid: { S: string };
  createdAt: { S: string };
}
