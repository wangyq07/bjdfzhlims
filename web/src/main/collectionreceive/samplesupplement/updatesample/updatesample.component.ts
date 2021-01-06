import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { CommonType, SealService } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { Sample } from 'src/services/sample.service';
import { ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-updatesample',
  templateUrl: './updatesample.component.html',
  styleUrls: ['./updatesample.component.scss']
})
export class UpdatesampleComponent implements OnInit,DoCheck {

  constructor(private commonservice:SealService) { }
  ngDoCheck(): void { 
                     this.setobjetproperti(this.curentsample
                      ,"testtype"
                       ,this.oldtesttypeid
                       ,this.testtypeid 
                       ,this.testtype);
                       this.setobjetproperti(this.curentsample
                        ,"status"
                         ,this.oldstatusid
                         ,this.statusid 
                         ,this.status);
                         this.setobjetproperti(this.curentsample
                          ,"process"
                           ,this.oldprocessid
                           ,this.processid
                           
                           ,this.process);
                           this.setobjetproperti(this.curentsample
                            ,"store"
                             ,this.oldstoreid
                             ,this.storeid
                              
                             ,this.store);
  }

  ngOnInit(): void {
     this.commonservice.gettesttype().subscribe(
     (x)=> this.testtype=x.list
    ); 
    this.commonservice.getsamplestatus().subscribe(
      (x)=> this.status=x.list
     ); 
     this.commonservice.getsamplestore().subscribe(
      (x)=> this.store=x.list
     ); 
     this.commonservice.getsampleprocess().subscribe(
       (x)=> this.process=x.list
      ); 
  } 
  testtypeid=999;
  statusid=999;
  storeid=999;
  processid=999;
  oldtesttypeid=0;
  oldstatusid=0;
  oldstoreid=0;
  oldprocessid=0;
  status=[];
  testtype=[]; 
  curentsample:Sample={}; 
  process=[];
  store=[];
  setobjetproperti(obj:any,propertyname:string,oldid:number,id:number,commontypes:CommonType[])
  {
        if(oldid !=id)
        {
          obj[propertyname]=commontypes.find((x)=>x.id==id);
          oldid=id;
        }
         
  }
  setSample(sample:Sample)
  {
        
      this.curentsample=ProjectUtil.deepClone(sample);
       this.curentsample.deleverdate=sample.deleverdate;
       this.curentsample.manudate=sample.manudate;
      if(this.curentsample.testtype!=undefined&&this.curentsample.testtype.id!=0)
      {
         this.testtypeid=Number(this.curentsample.testtype.id);
      }
      else
      {
        this.curentsample.testtype={id:999,label:'其它'};
      }
      if(this.curentsample.status!=undefined&&this.curentsample.status.id!=0)
      {
        this.statusid=Number(this.curentsample.status?.id);
      }
      else
      {
        this.curentsample.status={id:999,label:'其它'};
      }
      if(this.curentsample.store !=undefined && this.curentsample.store.id !=0)
      {
        this.storeid=Number(this.curentsample.store?.id);
      }
      else
      {
        this.curentsample.store={id:999,label:'其它'};
      }
      if(this.curentsample.process !=undefined&&this.curentsample.process.id !=0)
      {
        this.processid=Number(this.curentsample.process?.id);
      }
      else
      {
        this.curentsample.process={id:999,label:'其它'};
      }
  }
  get samplestatusdisabled()
  { 
    if( this.statusid==999)
    return false;
    return true;
  }
  get sampletesttypedisabled()
  {
    if( this.testtypeid==999)
    return false;
    return true;
  }
  get sampleprocessdisabled()
  { 
    if( this.processid==999)
    return false;
    return true;
  }
  get samplestoredisabled()
  {
    if( this.storeid==999)
    return false;
    return true;
  }
   
}
