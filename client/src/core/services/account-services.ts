import { HttpClient } from '@angular/common/http';
import { inject,Injectable, signal, Signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountServices {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null); // Placeholder for current user data
  private baseUrl=environment.apiUrl;

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
       }
     })
    );
  }

  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
       }
     })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
  
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
