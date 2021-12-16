import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(private us: UserService) { }
  keyword:any = null;
  $result: any = null;
  $resultLengh: any= 0;

  search(){
    this.us.search(this.keyword).subscribe((data) =>{
        this.$result = data;
        this.$resultLengh=data.length;
        alert(this.$resultLengh);
    });
  }
  ngOnInit() {}

}
