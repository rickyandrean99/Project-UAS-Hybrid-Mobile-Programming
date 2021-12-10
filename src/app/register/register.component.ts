import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  nama: string = '';
  username: string = '';
  password: string = '';
  re_pass: string = '';
  register_error: string = '';

  register() {
    if (this.password == this.re_pass) {
      this.us.addUser(this.nama, this.username, this.password).subscribe((data) => {
          if (data['result'] == 'success') {
            this.router.navigate(['/login']);
          } else {
            this.register_error = 'Terjadi kesalahan, silahkan mencoba kembali';
          }
        });
    } else {
      this.register_error = 'Password tidak sama. Silahkan coba kembali';
    }
  }
  constructor(public us: UserService, private router: Router) {}

  ngOnInit() {}
}
