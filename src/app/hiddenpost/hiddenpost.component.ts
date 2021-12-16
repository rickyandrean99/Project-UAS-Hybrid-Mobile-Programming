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
        this.list = data
        this.list.forEach((post, index) => {
          let difference = ((Number(new Date()) - Number(new Date(post.post_time))) / 1000) | 0
          let result = `${difference} seconds ago`

          // convert to minutes
          if (difference >= 60) {
              difference /= 60
              result = `${difference | 0} minutes ago`

              // convert to hours
              if (difference >= 60) {
                  difference /= 60
                  result = `${difference | 0} hours ago`

                  // convert to days
                  if (difference >= 24) {
                      difference /= 24
                      result = `${difference | 0} days ago`

                      // convert to months
                      if (difference >= 30) {
                          difference /= 30
                          result = `${difference | 0} months ago`

                          // convert to years
                          if (difference >= 365) {
                              difference /= 365
                              result = `${difference | 0} years ago`
                          }
                      }
                  }
              }
          }

          this.list[index].post_time = result
      })
      }
    )
  }

  async presentActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Unhide this post',
        icon: 'eye-outline',
        handler: async () => {
          const confirm = await this.alert.create({
            header: 'Unhide this post?',
            message: 'This post will be unhide.',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { }
              },
              {
                text: 'Okay',
                handler: async () => {
                  this.ps.unhidePost(this.list[index].id, this.login).subscribe(
                    (data) => {
                      if (data.result == 'success') {
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
      }]
    })

    await actionSheet.present()
  }

  constructor(public ps: PostService, private storage: Storage, public alert: AlertController, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.hiddenList()
  }

}
