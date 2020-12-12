import { Injectable } from '@angular/core';
import { Id, RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';  
import { ContactTestProject } from './ContactService';
@Injectable({ providedIn: 'root' })
export class SampleService extends RepositoryService<Sample> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'samples',servicetype:'businessprocess' } });
  }
}  
export interface Sample extends Id {  
samplename?:string;
projectid?:string;
samplenumber?:string; 
samplequality?:string;
samplespec?:string;
samplevolume?:string;
storeid?:string;
storeother?:string;
statusid?:string;
statusother?:string;
processid?:string;
processother?:string;
sampleuserid?:string;
sampledate?:string;
manufactory?:string;
manufactoryaddress?:string;
purty?:string;
brand?:string;
manufactoryphone?:string;
manudate?:string;
manuno?:string;
remark?:string;
expiredday?:string;
price?:string|number;
methodname?:string;
testproject?:string;
externprice?:string|number;
testprojects?:ContactTestProject[];
domainid?:number
}