import { CanActivate, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate, CanLoad {
    
    constructor(private loginService: LoginService) {}

    checkAuthentication(): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        
        if (!loggedIn)
            this.loginService.handleLogin()

        return loggedIn
    }

    canLoad(): boolean {
        return this.checkAuthentication()
    }

    canActivate() : boolean {
        return this.checkAuthentication()
    }
}