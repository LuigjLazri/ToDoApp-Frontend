import { Routes } from '@angular/router';
import { Backend} from './core/services/backend';
import {TodoListPage} from './features/todos/pages/todo-list-page/todo-list-page';
import {LoginPage} from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'todo-list', component: TodoListPage },
  { path: '**', redirectTo: '' }
];

