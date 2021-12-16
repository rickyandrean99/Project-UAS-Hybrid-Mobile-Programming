import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { PostService } from '../post.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-createpost',
    templateUrl: './createpost.component.html',
    styleUrls: ['./createpost.component.scss'],
})

export class CreatepostComponent implements OnInit {
    foto = ''

    openGallery() {
        this.camera
            .getPicture({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
            })
            .then((res) => {
                this.foto = 'data:image/jpeg;base64,' + res;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    update() {
        this.ps.createPost().subscribe(
            (data) => {
                console.log(data)
            }
        )
    }
    
    constructor(public ps: PostService, private storage: Storage, public camera: Camera, private router: Router) { }

    ngOnInit() { 

    }
}
