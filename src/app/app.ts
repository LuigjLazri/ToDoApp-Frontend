import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Backend} from './core/services/backend';
import {Header} from './core/layout/header/header';
import {Footer} from './core/layout/footer/footer'
import {TodoListPage} from './features/todos/pages/todo-list-page/todo-list-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, TodoListPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('todo-frontend');

  message = '';

  constructor(private backend: Backend) {}

  ngOnInit() {
    this.backend.getHomeMessage().subscribe({
      next: (response) => this.message = response,
      error: (err) => console.log('Backend Error:', err)
    });
  }
}
