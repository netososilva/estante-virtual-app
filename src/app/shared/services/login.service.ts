import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { User } from '../../core/login/user.model'

@Injectable()
export class LoginService {
    user: User

    constructor(private http: HttpClient,
                private router: Router) {
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${environment.ESTANTE_VIRTUAL_API}/login`, 
                            {email: email, password: password})
                        .pipe(
                            tap(user => this.user = user)
                        )                  
    }

    getUserId() : number {
        return this.user.id
    }

    handleLogin() {
        this.router.navigate(['/login'])
    }

    logout() {
        this.user = undefined
        this.router.navigate(['/login'])
    }
}