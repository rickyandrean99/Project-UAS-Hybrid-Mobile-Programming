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

    postDetail(username: string, postId: number): Observable<any> {
        let body = new HttpParams().set('username', username).set('post_id', postId)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/post_detail.php", body)
    }

    commentList(username: string, postId: number): Observable<any> {
        let body = new HttpParams().set('username', username).set('post_id', postId)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/comment_list.php", body)
    }

    changeLikeStatus(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/like_status.php", body)
    }

    changeSavedStatus(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/saved_status.php", body)
    }

    sendComment(postId: number, username: string, comment: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username).set('comment', comment)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/send_comment.php", body)
    }

    sendReply(postId: number, userCommentId: number, commentTime: string, username: string, reply: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('user_comment_id', userCommentId).set('comment_time', commentTime).set('username', username).set('reply', reply)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/send_reply.php", body)
    }

    deletePost(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/delete_post.php", body)
    }

    hidePost(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/hide_post.php", body)
    }

    getHideList(username: string): Observable<any> {
        let body = new HttpParams().set('username', username)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/hidden_list.php', body)
    }

    unhidePost(postId: number, username: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('username', username)
        return this.http.post("https://ubaya.fun/hybrid/160419051/metamu/unhide_post.php", body)
    }

    getEditPost(postId: number): Observable<any> {
        let body = new HttpParams().set('post_id', postId)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/get_edit_post.php', body)
    }

    createPost(username: string, photo: any, caption: string, location: string): Observable<any> {
        let body = new HttpParams().set('username', username).set('photo', photo).set('caption', caption).set('location', location)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/create_post.php', body)
    }

    editPost(postId: number, caption: string, location: string): Observable<any> {
        let body = new HttpParams().set('post_id', postId).set('caption', caption).set('location', location)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/edit_post.php', body)
    }

    getSavedList(username: string): Observable<any> {
        let body = new HttpParams().set('username', username)
        return this.http.post('https://ubaya.fun/hybrid/160419051/metamu/saved_list.php', body)
    }

    constructor(private http: HttpClient) { }
}
