import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForbiddenLoginDirective } from './directives/forbidden-login.directive';

@NgModule({
  declarations: [LoginFormComponent, ForbiddenLoginDirective],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
