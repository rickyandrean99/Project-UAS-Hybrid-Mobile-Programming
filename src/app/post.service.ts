import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})

export class PostService {
    postList(): Observable<any> {
        return this.http.get("https://ubaya.fun/hybrid/160419051/metamu/homeservice.php")
    }

    constructor(private http: HttpClient) { }
}
