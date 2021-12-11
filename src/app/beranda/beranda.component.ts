import { Component, OnInit } from '@angular/core'
import { PostService } from '../post.service'

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss'],
})

export class BerandaComponent implements OnInit {
    posts = null

    changeLikeStatus(index: number) {
        this.ps.changeLikeStatus(this.posts[index].post_id, "rickyandrean99").subscribe(
            (data) => {
                if (data == 'add')
                    this.posts[index].like_status = 1
                else
                    this.posts[index].like_status = 0
            }
        )
    }

    listPost() {
        this.ps.postList().subscribe(
            (data) => this.posts = data
        )
    }

    constructor(public ps: PostService) { }

    ngOnInit() {
        this.listPost()
    }
}
