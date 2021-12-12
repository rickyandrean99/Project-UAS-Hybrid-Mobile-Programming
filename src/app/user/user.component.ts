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

    async getUser(userTarget) {
        this.us.getUser(userTarget, await this.storage.get('user_id')).subscribe(
            (data) => {
                console.log(data)
            }
        )
    }

    constructor(public us: UserService, private storage: Storage, public route: ActivatedRoute) { }

    ngOnInit() { 
        this.getUser(this.route.snapshot.params['username'])
    }
}
