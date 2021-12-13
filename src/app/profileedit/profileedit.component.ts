import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-profileedit',
    templateUrl: './profileedit.component.html',
    styleUrls: ['./profileedit.component.scss'],
})
export class ProfileeditComponent implements OnInit {

    username: string = "";
    user = null;
    nama = "";
    bio = "";
    gender = "";
    birth = "";
    foto = "";

    userImg: any = '';
    base64Img = '';

    constructor(public ps: ProfileService, private storage: Storage, public camera:Camera) { }
    

    cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true
       }
    profile() {
        this.ps.getProfile(this.username).subscribe((data) => {
            this.nama = data["data"].name;  
            this.bio = data["data"].bio;
            this.gender = data["data"].gender;
            this.birth = data["data"].birth_date;
            this.foto = data["data"].photo;
            
        });
    }

    openCamera() {
        this.camera.getPicture(this.cameraOptions).then((imgData) => {
        console.log('image data =>  ', imgData);
        this.base64Img = 'data:image/jpeg;base64,' + imgData;
        this.userImg = this.base64Img;
        }, (err) => {
        console.log(err);
        })
       }
    async ngOnInit() {
        this.username = await this.storage.get('user_id');
        this.profile();
    }

}
