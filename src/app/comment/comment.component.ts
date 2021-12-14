import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})

export class CommentComponent implements OnInit {
    postComment = null

    getComment(postId: number) {
        this.ps.commentList(postId).subscribe(
            (data) => {
                this.postComment = data
            }
        )
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() { 
        this.getComment(this.route.snapshot.params['id'])
    }
}
