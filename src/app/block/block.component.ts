import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage';

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

  unblock() {

  }

  constructor(public us: UserService, private storage: Storage,) { }

  async ngOnInit() {
    this.login = await this.storage.get('user_id')
    this.blockedList()
  }
}
