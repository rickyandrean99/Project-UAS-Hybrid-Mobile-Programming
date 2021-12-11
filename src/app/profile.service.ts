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

  constructor(private http:HttpClient) { }
}
