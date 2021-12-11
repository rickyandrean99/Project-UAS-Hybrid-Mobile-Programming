import { Component, OnInit } from '@angular/core'
import { PostService } from '../post.service'
import { ActionSheetController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { UserService } from '../user.service'

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss'],
})

export class BerandaComponent implements OnInit {
    posts = null
    open = true

    changeLikeStatus(index: number) {
        this.ps.changeLikeStatus(this.posts[index].post_id, "rickyandrean99").subscribe(
            (data) => {
                if (data == 'add') {
                    this.posts[index].like_status = 1
                    this.posts[index].post_likes++
                } else {
                    this.posts[index].like_status = 0
                    this.posts[index].post_likes--
                }
            }
        )
    }

    async listPost() {
        this.ps.postList(await this.storage.get('user_id')).subscribe(
            (data) => {
                this.posts = data
                this.posts.forEach((post, index) => {
                    let difference = ((Number(new Date()) - Number(new Date(post.post_time))) / 1000) | 0
                    let result = `${difference} seconds ago`

                    // convert to minutes
                    if (difference >= 60) {
                        difference /= 60
                        result = `${difference | 0} minutes ago`

                        // convert to hours
                        if (difference >= 60) {
                            difference /= 60
                            result = `${difference | 0} hours ago`

                            // convert to days
                            if (difference >= 24) {
                                difference /= 24
                                result = `${difference | 0} days ago`

                                // convert to months
                                if (difference >= 30) {
                                    difference /= 30
                                    result = `${difference | 0} months ago`

                                    // convert to years
                                    if (difference >= 365) {
                                        difference /= 365
                                        result = `${difference | 0} years ago`
                                    }
                                }
                            }
                        }
                    }

                    this.posts[index].post_time = result
                })
            }
        )
    }

    async yodala(index: number) {
        if (this.posts[index].user_id == await this.storage.get('user_id')) {
            return [{
                text: 'Hide this post',
                icon: 'eye-off',
                handler: async () => {
                    this.ps.hidePost(this.posts[index].post_id, await this.storage.get('user_id')).subscribe(
                        (data) => {
                            if (data == 'success') {
                                let idx = this.posts.findIndex((post) => post.post_id === this.posts[index].post_id)
                                this.posts.splice(idx, 1)
                            }
                        }
                    )
                },
            }]
        } else {
            return [{
                text: 'Block friend',
                icon: 'person-remove',
                handler: async () => {
                    this.us.blockFriend(this.posts[index].user_id, await this.storage.get('user_id')).subscribe(
                        (data) => {
                            console.log(data)
                        }
                    )
                },
            },
            {
                text: 'Hide this post',
                icon: 'eye-off',
                handler: async () => {
                    this.ps.hidePost(this.posts[index].post_id, await this.storage.get('user_id')).subscribe(
                        (data) => {
                            if (data == 'success') {
                                let idx = this.posts.findIndex((post) => post.post_id === this.posts[index].post_id)
                                this.posts.splice(idx, 1)
                            }
                        }
                    )
                },
            }]
        }
    }

    async presentActionSheet(index: number) {
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'my-custom-class',
            buttons: ((this.posts[index].user_id == await this.storage.get('user_id')) ?
                [
                    {
                        text: 'Hide this post',
                        icon: 'eye-off',
                        handler: async () => {
                            this.ps.hidePost(this.posts[index].post_id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    if (data == 'success') {
                                        let idx = this.posts.findIndex((post) => post.post_id === this.posts[index].post_id)
                                        this.posts.splice(idx, 1)
                                    }
                                }
                            )
                        },
                    }
                ] : 
                [
                    {
                        text: 'Block friend',
                        icon: 'person-remove',
                        handler: async () => {
                            this.us.blockFriend(this.posts[index].user_id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    console.log(data)
                                }
                            )
                        },
                    },
                    {
                        text: 'Hide this post',
                        icon: 'eye-off',
                        handler: async () => {
                            this.ps.hidePost(this.posts[index].post_id, await this.storage.get('user_id')).subscribe(
                                (data) => {
                                    if (data == 'success') {
                                        let idx = this.posts.findIndex((post) => post.post_id === this.posts[index].post_id)
                                        this.posts.splice(idx, 1)
                                    }
                                }
                            )
                        },
                    }
                ]
            )
        })

        await actionSheet.present()
    }

    constructor(public ps: PostService, public us: UserService, public actionSheetController: ActionSheetController, private storage: Storage) { }

    ngOnInit() {
        this.listPost()
    }
}
