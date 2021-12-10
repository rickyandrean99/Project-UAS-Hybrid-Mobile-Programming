import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  user_id: string = "";
  error: string = "";

  loginDb() {
    this.us.checkUser(this.username, this.password).subscribe(
      (data) => {
        if(data['result'] == "success") {
          this.user_id = this.username;
          this.storage.set('user_id', this.username);
          this.router.navigate(['/home']);
        } 
        else {
          this.error = "Username atau Password salah. Silahkan coba lagi.";
        }
      }
    );
  }

  async logout() {
    await this.storage.remove('user_id');

    this.user_id = "";
    this.username = "";
    this.password = "";
    this.error = "";
  }

  constructor(public us: UserService, private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get('user_id');
  }
}
