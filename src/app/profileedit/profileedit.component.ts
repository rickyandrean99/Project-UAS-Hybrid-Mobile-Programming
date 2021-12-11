import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Storage } from '@ionic/storage';

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

    constructor(public ps: ProfileService, private storage: Storage) { }
    // username:string  = await this.storage.get('user_id');
    profile() {
        this.ps.getProfile(this.username).subscribe((data) => {
            // this.user = data['data'];
            // this.nama = this.user[0].name;
            // this.bio = this.user[0].bio;
            // this.gender = this.user[0].gender;
            // this.birth = this.user[0].birth_date;
            // alert(data);
        });
    }
    async ngOnInit() {
        this.username = await this.storage.get('user_id');
        this.profile();
    }

}
