import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatButtonModule, MatInputModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {}
