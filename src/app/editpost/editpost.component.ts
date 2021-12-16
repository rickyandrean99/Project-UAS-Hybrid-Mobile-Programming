import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-editpost',
    templateUrl: './editpost.component.html',
    styleUrls: ['./editpost.component.scss'],
})

export class EditpostComponent implements OnInit {
    post = null
    caption = ''
    location = ''

    getEditPost(idPost: number) {
        this.ps.getEditPost(idPost).subscribe(
            (data) => {
                this.post = data
                this.caption = data.post_caption
                this.location = data.post_location
            }
        )
    }

    async editPost() {
        const confirm = await this.alert.create({
            header: 'Edit this post?',
            message: 'You will change some information about this post',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Okay',
                    handler: async () => {
                        this.ps.editPost(this.post.post_id, this.caption, this.location).subscribe(
                            (data) => {
                                if (data == 'success') this.router.navigate([`/user/${this.post.user_id}/post/${this.post.post_id}`])
                            }
                        )
                    }
                }
            ]
        })

        await confirm.present()

         
    }

    constructor(public ps: PostService, private storage: Storage, public route: ActivatedRoute, private router: Router, public alert: AlertController) { }

    ngOnInit() { 
        this.getEditPost(this.route.snapshot.params['id'])
    }
}
