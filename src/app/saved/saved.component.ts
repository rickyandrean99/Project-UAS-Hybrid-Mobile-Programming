import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
  list = []
  login = ""

  constructor(public ps: PostService, public us: UserService, public actionSheetController: ActionSheetController, private storage: Storage) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
  }
}
