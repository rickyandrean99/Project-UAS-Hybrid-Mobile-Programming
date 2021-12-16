import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { PostService } from '../post.service';
import { Router } from "@angular/router";
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-createpost',
    templateUrl: './createpost.component.html',
    styleUrls: ['./createpost.component.scss'],
})

export class CreatepostComponent implements OnInit {
    photo = ''
    caption = ''
    location = ''

    openGallery() {
        this.camera
            .getPicture({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
            })
            .then((res) => {
                this.photo = 'data:image/jpeg;base64,' + res
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async createPost() {
        let time = formatDate(Date.now(),'yyyy-MM-dd HH:mm:ss','en-US')

        this.ps.createPost(await this.storage.get('user_id'), this.photo, this.caption, this.location, time).subscribe(
            (data) => {
                console.log(data)
            }
        )
    }
    
    constructor(public ps: PostService, private storage: Storage, public camera: Camera, private router: Router) { }

    ngOnInit() { 

    }
}
