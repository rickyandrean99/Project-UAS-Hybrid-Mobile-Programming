import { Injectable } from '@angular/core'
import { PostModel } from './post.model'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class PostService {
    posts: PostModel = new PostModel(
        1,
        'rickyandrean99',
        'Ricky Andrean',
        'ricky.jpg',
        'Hello Sayang',
        'Earth',
        '10 December 2021 17:03'
    );

    postList(): Observable<any> {
        return of("json")
    }

    constructor() { }
}
