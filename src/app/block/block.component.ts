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

  async blockedList() {
    let login = await this.storage.get('user_id')
    this.us.getBlockedUser(login).subscribe(
      (data) => {
        this.list = data
      }
    )
  }

  constructor(public us: UserService, private storage: Storage,) { }

  ngOnInit() {
    this.blockedList()
  }
}
