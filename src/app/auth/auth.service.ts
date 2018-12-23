import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEndpoints} from '../config/api-endpoints';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userInfoUrl: string;
  private readonly registerUrl: string;
  private readonly loginUrl: string;
  private readonly user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.userInfoUrl = apiEndpoints.currentUser;
    this.registerUrl = apiEndpoints.register;
    this.loginUrl = apiEndpoints.login;
  }

  public register(data: RegistrationData): Observable<void> {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key]);
    }
    return this.handleAuthResponse(this.http.post<AuthResponse>(this.registerUrl, formData));
  }

  public login(email: string, password: string): Observable<void> {
    return this.handleAuthResponse(this.http.post<AuthResponse>(this.loginUrl, {email, password}));
  }

  public logout() {
    this.removeToken();
    this.user$.next(null);
    this.router.navigate(['login']);
  }

  public loggedIn(): boolean {
    return !!this.getToken();
  }

  public getUser(): Observable<User> {
    if (this.loggedIn() && !this.user$.getValue()) {
      this.http.get<User>(this.userInfoUrl).subscribe((user) => this.user$.next(user));
    }
    return this.user$.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private handleAuthResponse(response: Observable<AuthResponse>): Observable<void> {
    return response.pipe(
      tap(res => {
        this.setToken(res.token);
        this.user$.next(res.user);
      }),
      map(() => {})
    );
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

}
