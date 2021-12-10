import { Component, OnInit } from '@angular/core'
import { PostService } from '../post.service'

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss'],
})

export class BerandaComponent implements OnInit {
    posts = null

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
