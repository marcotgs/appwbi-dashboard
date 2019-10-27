import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginResponse } from '@shared/interfaces';

@Injectable()
export default class AuthTokenService {
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

    public decodeToken(token?: string): any {
        const helper = new JwtHelperService();
        return helper.decodeToken(token || this.getToken());
    }

    public getToken(): string {
        return localStorage.getItem(this.keyIdToken);
    }

    private getExpiration() {
        const expiration = localStorage.getItem(this.keyExpiresAt);
        const expiresAt = JSON.parse(expiration);
        return new Date(expiresAt);
    }
}