import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})

export class PostService {
    postList(username: string): Observable<any> {
        let body = new HttpParams().set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/post_list.php", body)
    }

    postDetail(username: string, postId: number) {
        let body = new HttpParams().set('username', username).set('post_id', postId)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/post_detail.php", body)
    }

    changeLikeStatus(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/like_status.php", body)
    }

    changeSavedStatus(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/saved_status.php", body)
    }

    hidePost(postId: number, username: string) {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/hide_post.php", body)
    }

    constructor(private http: HttpClient) { }
}
