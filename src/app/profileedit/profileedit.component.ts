import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';

@Component({
    selector: 'app-profileedit',
    templateUrl: './profileedit.component.html',
    styleUrls: ['./profileedit.component.scss'],
})
export class ProfileeditComponent implements OnInit {
    username: string = '';
    user = null;
    nama = '';
    bio = '';
    gender = '';
    birth = '';
    foto = '';
    currentPass = "";
    newPass = "";
    rePass = "";

    constructor(
        public ps: ProfileService,
        private storage: Storage,
        public camera: Camera,
        public alert: AlertController,
        public modal: ModalController,
        private router: Router
    ) { }

    profile() {
        this.ps.getProfile(this.username).subscribe((data) => {
            this.nama = data['data'].name;
            this.bio = data['data'].bio;
            this.gender = data['data'].gender;
            this.birth = data['data'].birth_date;
            this.foto =
                'https://ubaya.fun/hybrid/160419051/metamu/profiles/' +
                data['data'].photo+'?dummy='+Math.floor(Math.random() * 999999);
        });
    }

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
        this.birth = this.formatDate(this.birth);
        this.ps
            .updateProfile(
                this.username,
                this.nama,
                this.bio,
                this.gender,
                this.birth,
                this.foto
            )
            .subscribe((data) => {
                this.presetAlert(data['pesan']);
            });
    }

    async presetAlert(pesan: string) {
        var confirm = await this.alert.create({
            header: 'Edit profile',
            message: pesan,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/user/'+this.username]);
                    }
                }
            ]
        });
        await confirm.present();
    }

    async openResetModal() {
        let modal = await this.modal.create({
            component: ResetpasswordComponent,
            swipeToClose: true,
        });

        return await modal.present();
    }

    formatDate(date) {
        var d = new Date(date);
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }
    async ngOnInit() {
        this.username = await this.storage.get('user_id');
        this.profile();
    }
}
