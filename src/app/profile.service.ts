import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getProfile(username:string){
    let body = new HttpParams();
    body = body.set('username', username);

    return this.http.post(
      'https://ubaya.fun/hybrid/160419051/metamu/getProfile.php',
      body
    );
  }

  updateProfile(username: string, name: string, bio: string, gender:string, birth_date:string, photo:string): Observable<any>{
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('name', name);
    body = body.set('bio', bio);
    body = body.set('gender', gender);
    body = body.set('birth_date', birth_date);
    body = body.set('photo', photo);

    return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/updateUser.php', body);
}

  constructor(private http:HttpClient) { }
}
