import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}
