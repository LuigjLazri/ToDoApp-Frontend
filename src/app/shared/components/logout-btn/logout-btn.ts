import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout-btn',
  imports: [],
  templateUrl: './logout-btn.html',
  styleUrl: './logout-btn.scss'
})
export class LogoutBtn {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
