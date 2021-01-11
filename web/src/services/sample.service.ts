import { Injectable } from '@angular/core';
import { Id, RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';  
import { ContactTestProject } from './ContactService';
import { CommonType } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
@Injectable({ providedIn: 'root' })
export class SampleService extends RepositoryService<Sample> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'samples',servicetype:'businessprocess' } });
  }
  supplimentupdatesamples(samples:any[])
  {
    return this.http.post(`${this.option.controller?.name}/supplimentupdatesamples`,{sampledatas:samples},this.option.controller?.servicetype);
  }
  getsamplestandardprice(contacttestprojects:any[])
  {
    return this.http.post(`${this.option.controller?.name}/getsamplestandardprice`,{testprojects:contacttestprojects},this.option.controller?.servicetype);
  }
}  
export interface Sample extends Id {  
samplename?:string;
projectid?:string;
samplenumber?:string; 
samplequality?:string;
samplespec?:string;
samplevolume?:string; 
sampledate?:string;
manufactory?:string;
manufactoryaddress?:string;
purty?:string;
brand?:string;
manufactoryphone?:string;
manudate?:string|Date;
manuno?:string;
remark?:string;
avilabletime?:string;
leftsamplequality?:string;
expireddate?:string;
price?:string|number;
methodname?:string;
testproject?:string;
externprice?:string|number;
testprojects?:ContactTestProject[];
domainid?:number;
 testtype?:CommonType;
 status?:CommonType;
 store?:CommonType;
 process?:CommonType;
 executestandard?:string;
 executegrade?:string;
 wrapherproperties?:string;
testtypeother?:string;
 processother?:string;
storeother?:string;
statusother?:string;
standardfee?:number;
specialcondition?:string;
deleverdate?:string|Date
}