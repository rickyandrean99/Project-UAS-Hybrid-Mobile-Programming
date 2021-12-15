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
    post = null

    convertTime(time) {
        // Converting datetime
        let difference = ((Number(new Date()) - Number(new Date(time))) / 1000) | 0
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

        return timePassed
    }

    getComment(postId: number) {
        this.ps.commentList(postId).subscribe(
            (data) => {
                data['time'] = this.convertTime(data['time'])
                data['comments'].forEach((comment, index1) => {
                    data['comments'][index1].time = this.convertTime(comment.time)
                    comment.replies.forEach((reply, index2) => {
                        data['comments'][index1].replies[index2].time = this.convertTime(reply.time)
                    })
                })
                
                let splitCaption = ''
                data['caption'].split(" ", 10).forEach(caption => splitCaption += caption + ' ' )
                data['caption'] = ` ${splitCaption}...`
                
                this.post = data
                console.log(this.post)
            }
        )
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() { 
        this.getComment(this.route.snapshot.params['id'])
    }
}
