import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})

export class CommentComponent implements OnInit {
    post = null
    userText = ''
    replyData = null

    convertTime(time) {
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

    async getComment(postId: number) {
        this.ps.commentList(await this.storage.get('user_id'), postId).subscribe(
            (data) => {
                data['timeText'] = this.convertTime(data['time'])
                data['comments'].forEach((comment, index1) => {
                    data['comments'][index1].timeText = this.convertTime(comment.time)
                    comment.replies.forEach((reply, index2) => {
                        data['comments'][index1].replies[index2].timeText = this.convertTime(reply.time)
                    })
                })
                
                let splitCaption = ''
                data['caption'].split(" ", 10).forEach(caption => splitCaption += caption + ' ' )
                data['caption'] = ` ${splitCaption}...`
                
                this.post = data
            }
        )
    }

    async sendCommentReply() {
        let userId = await this.storage.get('user_id')

        if (this.replyData) {
            this.ps.sendReply(this.post.post_id, this.replyData.user_id, this.replyData.time, userId, this.userText).subscribe(
                (data) => {
                    if (data == 'success') {
                        let reply = {
                            user_id: userId,
                            user_photo: this.post.user_login_photo,
                            timeText: 'now',
                            reply: this.userText
                        }
    
                        let indexComment = this.post.comments.findIndex((post) => post.user_id === this.replyData.user_id && post.time === this.replyData.time)
                        this.post.comments[indexComment].replies.unshift(reply)
                        
                        this.replyData = null
                        this.userText = ''
                    }
                }
            )
        } else {
            this.ps.sendComment(this.post.post_id, userId, this.userText).subscribe(
                (data) => { 
                    if (data == 'success') {
                        let comment = {
                            user_id: userId,
                            user_photo: this.post.user_login_photo,
                            timeText: 'now',
                            comment: this.userText,
                            replies: []
                        }

                        this.post.comments.unshift(comment)
                        this.userText = ''
                    }
                }
            )
        }
    }

    reply(commentId: number) {
        this.replyData = this.post.comments[commentId]
    }

    removeReply() {
        this.replyData = null
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() { 
        this.getComment(this.route.snapshot.params['id'])
    }
}
