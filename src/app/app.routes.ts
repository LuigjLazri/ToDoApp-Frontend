import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { TodoList } from './todos/todo-list/todo-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'todos', component: TodoList },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // default route
];

