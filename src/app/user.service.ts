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

    blockFriend(friend: string, username: string) {
        let body = new HttpParams().set('friend', friend).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/block_friend.php", body)
    }

    constructor(private http: HttpClient) { }
}