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
        // console.log(data)
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
              // console.log(this.list[index].id)
              // console.log(this.login)
                this.ps.unhidePost(this.list[index].id, this.login).subscribe(
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

  constructor(public ps: PostService, private storage: Storage, public alert: AlertController, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.hiddenList()
  }

}
