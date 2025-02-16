import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = 'token';

  constructor() {}

  getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.token, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
