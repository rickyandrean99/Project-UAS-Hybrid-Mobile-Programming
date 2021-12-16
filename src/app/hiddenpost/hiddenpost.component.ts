import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
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
        this.list = data
      }
    )
  }

  async presentActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
        buttons: [{
            text: 'Unhide this post',
            icon: 'eye-outline',
            handler: async () => {
                this.ps.unhidePost(this.list[index].post_id, this.login).subscribe(
                    (data) => {
                        if (data['result'] == 'success') {
                            this.list.splice(index, 1)
                        }
                    }
                )
            }
        }]
    })

    await actionSheet.present()
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

  constructor(public ps: PostService, private storage: Storage, public alert: AlertController, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.hiddenList()
  }

}
