import { Injectable } from '@angular/core';
import { LoginResponse } from '@app/api/interfaces';

@Injectable()
export default class AuthService {
    private keyIdToken = 'id_token';
    private keyExpiresAt = 'expires_at';

    public setSession(authResult: LoginResponse): void {
        localStorage.setItem(this.keyIdToken, authResult.token);
        localStorage.setItem(this.keyExpiresAt, authResult.expiresIn.toString());
    }

    public logout() {
        localStorage.removeItem(this.keyIdToken);
        localStorage.removeItem(this.keyExpiresAt);
    }

    public isLoggedIn() {
        return (this.getToken() && new Date() <= this.getExpiration());
    }

    private getExpiration() {
        const expiration = localStorage.getItem(this.keyExpiresAt);
        const expiresAt = JSON.parse(expiration);
        return new Date(expiresAt);
    }

    private getToken(): string {
        return localStorage.getItem(this.keyIdToken);
    }
}