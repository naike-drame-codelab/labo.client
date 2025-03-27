import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session = signal<any>({});

  constructor() {}

  startSession(token: string) {
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    console.log(decodedToken['email']);

    this.session.set({
      token,
      isAuthenticated: true,
      exp: new Date(decodedToken.exp * 1000),
      id: decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
      username:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ],
      email:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      role: decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    });
  }

  clearSession() {
    this.session.set({});
  }
}
