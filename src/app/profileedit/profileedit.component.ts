import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';

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

  userImg: any = '';
  base64Img = '';

  constructor(
    public ps: ProfileService,
    private storage: Storage,
    public camera: Camera
  ) {}

  profile() {
    this.ps.getProfile(this.username).subscribe((data) => {
      this.nama = data['data'].name;
      this.bio = data['data'].bio;
      this.gender = data['data'].gender;
      this.birth = data['data'].birth_date;
      this.foto =
        'https://ubaya.fun/hybrid/160419051/metamu/profiles/' +
        data['data'].photo;
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
        alert(data['pesan']);
      });
  }
  formatDate(date){
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2){
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
