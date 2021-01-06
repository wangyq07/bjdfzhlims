import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trim } from 'lodash';
import { Qualification } from 'src/main/qualification/qualification.service';
 
import { ProjectUtil } from 'src/share/utilclass';
 

@Component({
  selector: 'app-addmethodqualification',
  templateUrl: './addmethodqualification.component.html',
  styleUrls: ['./addmethodqualification.component.scss']
})
export class AddmethodqualificationComponent implements OnInit {
  qual:Qualification={}; 
  constructor() { }
  @Output() datachange=new EventEmitter<Qualification>();
  ngOnInit(): void {
  }
  setMethod(param:Qualification)
  {
    this.qual=ProjectUtil.deepClone(param);
    this.qual.methodname='';
    this.qual.methodid='';
    this.qual.id=ProjectUtil.JsNewGuid();
  }
  savedata()
  {
      if(this.datachange !=undefined)
      {
        this.datachange.emit(this.qual);
      }
  }
  get disabled()
  {
    if( trim(this.qual.methodname) =='')
    return true;
    return false;
  }
}
