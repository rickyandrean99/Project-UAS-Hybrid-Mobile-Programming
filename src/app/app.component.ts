import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username_login: string = '';
  password_login: string = '';
  user_id: string = '';
  login_error: string = '';

  login_status = false;
  register_status = true;

  loginDb() {
    this.us.checkUser(this.username_login, this.password_login).subscribe((data) => {
      if (data['result'] == 'success') {
        this.user_id = this.username_login;
        this.storage.set('user_id', this.username_login);
        this.router.navigate(['/home']);
      } else {
        this.login_error = 'Username atau Password salah. Silahkan coba lagi.';
      }
    });
  }

  nama: string = '';
  username_register: string = '';
  password_register: string = '';
  re_pass: string = '';
  register_error: string = '';

  register() {
    if (this.password_register == this.re_pass) {
      this.us.addUser(this.nama, this.username_register, this.password_register).subscribe((data) => {
          if (data['result'] == 'success') {
            this.pindahLogin();
          } else {
            this.register_error = 'Terjadi kesalahan, silahkan mencoba kembali';
          }
        });
    } else {
      this.register_error = 'Password tidak sama. Silahkan coba kembali';
    }
  }

  async logout() {
    await this.storage.remove('user_id');

    this.user_id = '';
    this.username_login = '';
    this.password_login = '';
    this.login_error = '';
  }

  pindahLogin() {
    this.login_status = false;
    this.register_status = true;
  }

  pindahRegister() {
    this.login_status = true;
    this.register_status = false;
  }

  constructor(public us: UserService, private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get('user_id');
  }
}
