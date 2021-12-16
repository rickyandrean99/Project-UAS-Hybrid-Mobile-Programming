import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    addUser(name: string, username: string, password: string): Observable<any> {
        let body = new HttpParams()
        body = body.set('name', name)
        body = body.set('username', username)
        body = body.set('password', password)

        return this.http.post(
            'https://ubaya.fun/hybrid/160419051/metamu/registerservice.php',
            body
        )
    }

    checkUser(username: string, password: string) {
        let body = new HttpParams()
        body = body.set('username', username)
        body = body.set('password', password)

        return this.http.post(
            'https://ubaya.fun/hybrid/160419051/metamu/loginservice.php',
            body
        )
    }

    blockUser(userTarget: string, username: string) {
        let body = new HttpParams().set('user_target', userTarget).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/block_user.php", body)
    }

    getUser(userTarget: string, username: string) {
        let body = new HttpParams().set('user_target', userTarget).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/get_user.php", body)
    }

    getBlockedUser(username: string): Observable<any>{
        let body = new HttpParams().set('username', username)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/blocked_list.php', body)
    }

    search(username: string): Observable<any>{
        let body = new HttpParams().set('username', username);
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/search.php', body);
    }

    constructor(private http: HttpClient) { }
}
