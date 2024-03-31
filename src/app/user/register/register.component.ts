import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { username, email, password , rePassword } = form.value;

    console.log(form.value);
    

    this.userService.register(username, email, password , rePassword).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}