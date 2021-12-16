import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

  constructor(public modal: ModalController, private storage: Storage,private router: Router,public alert: AlertController,public ps: ProfileService,) { }
  @Input() currentPass:any;
  // newPass= "";
  // rePass = "";
  username: string="";
  dimisModal(){
    this.modal.dismiss({

    });
  }

  save(){
    // this.ps.resetPassword(this.username,this.currentPass,this.newPass,this.rePass).subscribe((data) => {
    //   this.showAlert(this.currentPass);
    // });
    this.modal.dismiss({
      curPass: this.currentPass,
    });
  }

  async showAlert(pesan){
    var confirm = await this.alert.create({
      header: 'Announcement',
      message: pesan,
      buttons: [
        {
            text: 'Cancel',
            handler: () => {
              if(pesan == "success change your password"){
                
              }
             }
        }
      ]
    });
    await confirm.present();
  }
  async ngOnInit() {this.username = await this.storage.get('user_id');}

}
