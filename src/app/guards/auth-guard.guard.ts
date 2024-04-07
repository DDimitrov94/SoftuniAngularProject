import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) { }
  
  canActivate(): Observable<boolean> {  

    return this.userService.user$.pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['/home'])
        return false;
        }
       return true;
      })
    );
  };
};