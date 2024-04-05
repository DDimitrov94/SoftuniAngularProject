import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isAuthenticated = true;
  constructor(private userService: UserService) { };

  ngOnInit() :void {
    this.userService.getUserInfo().subscribe({
      next: () => { this.isAuthenticated = false },
      error: () => { this.isAuthenticated = false },
      complete: () => { this.isAuthenticated = false }
    });
  };
}
