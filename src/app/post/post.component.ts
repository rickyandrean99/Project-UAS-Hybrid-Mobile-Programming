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
                // Converting datetime
                let difference = ((Number(new Date()) - Number(new Date(data["post_time"]))) / 1000) | 0
                let timePassed = `${difference} seconds ago`

                if (difference >= 60) {
                    difference /= 60
                    timePassed = `${difference | 0} minutes ago`

                    if (difference >= 60) {
                        difference /= 60
                        timePassed = `${difference | 0} hours ago`

                        if (difference >= 24) {
                            difference /= 24
                            timePassed = `${difference | 0} days ago`

                            if (difference >= 30) {
                                difference /= 30
                                timePassed = `${difference | 0} months ago`

                                if (difference >= 365) {
                                    difference /= 365
                                    timePassed = `${difference | 0} years ago`
                                }
                            }
                        }
                    }
                }
                
                // Assign value
                data["post_time"] = timePassed
                this.post = data
            }
        )
    }

    async changeLikeStatus(index: number) {
        this.ps.changeLikeStatus(this.post.id, await this.storage.get('user_id')).subscribe(
            (data) => {
                if (data == 'add') {
                    this.post.like_status = 1
                    this.post.like_amount++
                } else {
                    this.post.like_status = 0
                    this.post.like_amount--
                }
            }
        )
    }

    async changeSavedStatus() {
        this.ps.changeSavedStatus(this.post.id, await this.storage.get('user_id')).subscribe(
            (data) => {
                if (data == 'saved')
                    this.post.saved_status = 1
                else
                    this.post.saved_status = 0
            }
        )
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() {
        this.getPost(this.route.snapshot.params['id'])
    }
}
