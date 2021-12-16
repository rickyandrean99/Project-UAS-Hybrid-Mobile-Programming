import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(private us: UserService) { }
  result: any = null;
  resultLengh: any= null;
  users="";

  search(event:Event){
    let keyword = event.target as HTMLInputElement
    this.us.search(keyword.value).subscribe((data) =>{
        this.result = data;
        this.resultLengh=data.length;
    });
  }
  ngOnInit() {}

}
