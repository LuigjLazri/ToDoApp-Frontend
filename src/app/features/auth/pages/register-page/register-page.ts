import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [
    FormsModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}


  register(){
    return this.http.post< {message: string}>(`${this.apiUrl}/auth/register`, {
      username: this.username,
      password: this.password
    })
      .subscribe({
      next: () => {
        console.log("Login worked");
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log("GOT AN ERROR");
        this.errorMessage = "Username already taken";
        console.error('Register error', err);
      }
    });
  }
}
