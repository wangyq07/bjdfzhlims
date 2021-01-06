import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdditionalData, ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-outputadditionallist',
  templateUrl: './outputadditionallist.component.html',
  styleUrls: ['./outputadditionallist.component.scss']
})
export class OutputadditionallistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data:AdditionalData[]=[];
  
  setdata(projects:any[],judgement:string)
  {
     this.data=ProjectUtil.getMareData(projects,judgement);
  }
  
  
}

