import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { PostService } from '../post.service';

@Component({
  selector: 'app-hiddenpost',
  templateUrl: './hiddenpost.component.html',
  styleUrls: ['./hiddenpost.component.scss'],
})
export class HiddenpostComponent implements OnInit {
  list = []
  login = ""

  hiddenList() {
    this.ps.getHideList(this.login).subscribe(
      (data) => {
        console.log(data)
        // this.list = data
      }
    )
  }

  // async unblock(userTarget: string, index: number) {
  //   const confirm = await this.alert.create({
  //     header: 'Unblock this person?',
  //     message: 'This person will be unblocked.',
  //     buttons: [
  //         {
  //             text: 'Cancel',
  //             role: 'cancel',
  //             handler: () => { }
  //         },
  //         {
  //             text: 'Okay',
  //             handler: async () => {
  //                 this.us.blockUser(userTarget, this.login).subscribe(
  //                   (data) => {
  //                     if(data == 'unblock'){
  //                       this.list.splice(index, 1)
  //                     }
  //                   }
  //                 )
  //             }
  //         }
  //     ]
  // })

  constructor(public ps: PostService, private storage: Storage, public alert: AlertController) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.hiddenList()
  }

}
