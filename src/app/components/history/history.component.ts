import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyDetails:any;
  errMsg:any;
  
  constructor() { }

  ngOnInit(): void {
    let data:any = localStorage.getItem("historyData");
    if(data != null){
    this.historyDetails = JSON.parse(data);
    }
    if(data === '[]' || data === null){
     this.errMsg = "No Data Found" 
    }
  }
  onDelete(value:string, index:any){
    console.log(value, index)
    this.historyDetails.splice(index,1);
    localStorage.setItem("historyData",JSON.stringify(this.historyDetails));
  }
}
