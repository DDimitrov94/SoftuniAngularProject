import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, lastValueFrom, tap } from 'rxjs';
import { UserForAuth } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get username(): string | undefined{
    return this.user?.username
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async init(): Promise<any>{
    return lastValueFrom(this.getUserInfo());
  }

  getUserInfo() {
    return this.http.get<UserForAuth>('/api/auth/userInfo').pipe(tap((user) => 
      this.user$$.next(user)
    ));
  };

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`/api/auth/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/auth/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/auth/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

