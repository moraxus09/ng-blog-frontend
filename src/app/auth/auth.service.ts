import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEndpoints} from '../config/api-endpoints';
import {Observable, ReplaySubject} from 'rxjs';
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

  private readonly registerUrl: string;
  private readonly loginUrl: string;
  private readonly user$ = new ReplaySubject<User>(1);

  constructor(private http: HttpClient, private router: Router) {
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
    this.setToken(null);
    this.user$.next(null);
    this.router.navigate(['login']);
  }

  public getUser(): Observable<User> {
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

  private setToken(token: string | null) {
    localStorage.setItem('token', token);
  }

}
