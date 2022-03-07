import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}  //inject the authService

  ngOnInit(): void {
    this.authService.autoLogin();   //call authService autoLogin :: check to see if automatically logging a user in with a stored token works
  }
}
