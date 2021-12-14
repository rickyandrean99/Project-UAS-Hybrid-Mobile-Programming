import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'my-custom-class',
            buttons: ((this.post.users_id == await this.storage.get('user_id')) ?
                [
                    // user
                    {
                        text: 'Hide this post',
                        icon: 'eye-off',
                        handler: async () => {
                            this.ps.hidePost(this.post.id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    if (data == 'success') this.router.navigate(['/home'])
                                }
                            )
                        },
                    },
                    {
                        text: 'Edit post',
                        icon: 'create',
                        handler: async () => {
                            this.router.navigate([`/editpost/${this.post.id}`])
                        },
                    },
                    {
                        text: 'Delete post',
                        icon: 'trash',
                        handler: async () => {
                            // modal konfirmasi
                            this.deleteConfirmation()

                            // delete
                            // redirect home
                        },
                    }
                ] :
                [
                    // bukan user
                    {
                        text: 'Block friend',
                        icon: 'person-remove',
                        handler: async () => {
                            this.us.blockUser(this.post.users_id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    if (data == "block") this.router.navigate(['/home'])
                                }
                            )
                        },
                    },
                    {
                        text: 'Hide this post',
                        icon: 'eye-off',
                        handler: async () => {
                            this.ps.hidePost(this.post.id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    if (data == 'success') this.router.navigate(['/home'])
                                }
                            )
                        },
                    }
                ]
            )
        })

        await actionSheet.present()
    }

    // alert
    async deleteConfirmation() {
        const confirm = await this.alert.create({
            header: 'Delete this post?',
            message: 'This post will be deleted permanently from your account',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Okay',
                    handler: async () => {
                        this.ps.deletePost(this.post.id, await this.storage.get('user_id')).subscribe(
                            (data) => {
                                console.log(data)
                            }
                        )
                    }
                }
            ]
        })

        await confirm.present()
    }

    constructor(public ps: PostService, public us: UserService, private storage: Storage, public actionSheetController: ActionSheetController, public route: ActivatedRoute, private router: Router, public alert: AlertController) { }

    ngOnInit() {
        this.getPost(this.route.snapshot.params['id'])
    }
}
