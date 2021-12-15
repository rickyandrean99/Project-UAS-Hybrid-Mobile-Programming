import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

  constructor(public modal: ModalController) { }

  dimisModal(){
    this.modal.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {}

}
