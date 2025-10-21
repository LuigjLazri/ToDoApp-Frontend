import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Backend} from './core/services/backend';
import {Header} from './core/layout/header/header';
import {Footer} from './core/layout/footer/footer'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
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
