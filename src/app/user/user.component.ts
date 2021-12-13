import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Storage } from '@ionic/storage'
import { UserService } from '../user.service'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {
    user = null
    user_id_login: string = ''

    async getUser(userTarget) {
        let login = await this.storage.get('user_id')
        this.us.getUser(userTarget, login).subscribe(
            (data) => {
                let same = 0

                for (let block1 of data["data"].block_list) {
                    for (let block2 of data["data"].block_list) {
                        if (block1.users_id == block2.users_id && block1.block_friend == block2.block_friend) continue
                        
                        if (block1.users_id == block2.block_friend && block1.block_friend == block2.users_id) {
                            same++
                            continue
                        }
                    }
                }

                data["data"].friend_amount = parseInt(data["data"].friend_amount) + (same/2) - data["data"].block_list.length
                this.user_id_login = login
                this.user = data["data"]
            }
        )
    }

    constructor(public us: UserService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() { 
        this.getUser(this.route.snapshot.params['username'])
    }
}
