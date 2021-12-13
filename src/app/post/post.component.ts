import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
    post = null

    async getPost(postId) {
        this.ps.postDetail(await this.storage.get('user_id'), postId).subscribe(
            (data) => {
                console.log(data)
            }
        )
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() {
        this.getPost(this.route.snapshot.params['id'])
    }
}
