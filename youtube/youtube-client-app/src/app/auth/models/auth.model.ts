import { FormControl } from '@angular/forms';

export interface Auth {
  login: string;
  password: string;
  token?: string;
}

export interface Login {
  login: FormControl<string>;
  password: FormControl<string>;
}
