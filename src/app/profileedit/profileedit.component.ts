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
    foto = "";

    constructor(public ps: ProfileService, private storage: Storage) { }
    // username:string  = await this.storage.get('user_id');
    profile() {
        this.ps.getProfile(this.username).subscribe((data) => {
            this.nama = data["data"].name;  
            this.bio = data["data"].bio;
            this.gender = data["data"].gender;
            this.birth = data["data"].birth_date;
            this.foto = data["data"].photo;
            
        });
    }
    async ngOnInit() {
        this.username = await this.storage.get('user_id');
        this.profile();
    }

}
