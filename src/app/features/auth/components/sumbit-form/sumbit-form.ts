import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sumbit-form',
  imports: [
    FormsModule
  ],
  templateUrl: './sumbit-form.html',
  styleUrl: './sumbit-form.scss'
})

export class SumbitForm {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginRequest = {
      username: this.username,
      password: this.password
    };
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, {
      username: this.username,
      password: this.password
    })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/todo-list']);
        },
        error: err => {
          this.errorMessage = 'Invalid username or password';
          console.error('login error', err);
        }
      });
  }

}
