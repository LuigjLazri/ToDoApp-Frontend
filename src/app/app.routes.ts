import { Routes } from '@angular/router';
import {TodoListPage} from './features/todos/pages/todo-list-page/todo-list-page';
import {LoginPage} from './features/auth/pages/login-page/login-page';
import {AuthGuard} from './core/guards/auth-guard';
import {RegisterPage} from './features/auth/pages/register-page/register-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  {path: 'login', component: LoginPage},
  { path: 'register', component: RegisterPage},
  { path: 'todo-list', component: TodoListPage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

