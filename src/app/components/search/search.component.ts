import { Component, OnInit } from '@angular/core';
import gitHubUsers from "../../../assets/gitHubUsers.json";
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  control = new FormControl();
  streets: string[] = ['Test - 1', 'Test - 2', 'Test - 3', 'Test - 4'];
  filteredStreets: Observable<string[]> | undefined;
  errMsg: any;
  searchedRecords:any;

  constructor() { }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onSearch(){
    console.log(this.control.value)
    let localstorageData = JSON.parse(localStorage.getItem("historyData") || "[]")
    console.log("local",localstorageData)
    if(this.control.value != null && this.control.value != ""){
      let createRecords = {
        val:this.control.value
      }
      let historyData:any = [];
      
      historyData.push(createRecords);
      console.log("historyData",historyData)
      historyData = historyData.concat(localstorageData)
      localStorage.setItem("historyData",JSON.stringify(historyData))
    }
    
    console.log(gitHubUsers.gitHubUsers)
    let searchVal = gitHubUsers.gitHubUsers.filter((a: { username: any; })=> a.username == this.control.value )
    console.log(searchVal);
    if(searchVal.length == 0 || searchVal == null){
      this.errMsg = "No Data Found"
      this.searchedRecords = "";
    }
    else{
      this.errMsg = ""
      this.searchedRecords = searchVal;
    }
  }
}
