import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  userName: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.currentUser = this.authService.currentUserValue;
    this.currentUser = localStorage.getItem('currentUser')
    let userObj = JSON.parse(this.currentUser);
    this.userName = userObj.name;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authService.logout();
  }
}
