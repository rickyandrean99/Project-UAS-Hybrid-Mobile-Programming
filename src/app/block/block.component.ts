import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  list = []
  login = ""

  async blockedList() {
    this.us.getBlockedUser(this.login).subscribe(
      (data) => {
        this.list = data
      }
    )
  }

  async unblock(userTarget: string, index: number) {
    const confirm = await this.alert.create({
      header: 'Unblock this person?',
      message: 'This person will be unblocked.',
      buttons: [
          {
              text: 'Cancel',
              role: 'cancel',
              handler: () => { }
          },
          {
              text: 'Okay',
              handler: async () => {
                  this.us.blockUser(userTarget, this.login).subscribe(
                    (data) => {
                      if(data == 'unblock'){
                        this.list.splice(index, 1)
                      }
                    }
                  )
              }
          }
      ]
  })

  await confirm.present()
  }

  constructor(public us: UserService, private storage: Storage, public alert: AlertController) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.blockedList()
  }
}
