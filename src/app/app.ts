import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './core/layout/header/header';
import {Footer} from './core/layout/footer/footer'
import {LogoutBtn} from './shared/components/logout-btn/logout-btn';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, LogoutBtn],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-frontend');
}
