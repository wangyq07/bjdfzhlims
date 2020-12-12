import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { XTreeNode } from '@ng-nest/ui/tree'
import { XId } from '@ng-nest/ui'; 
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TestProjectService extends RepositoryService<TestProject> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'testprojects',servicetype:'businessprocess' } });

  }
  getprojectsbylevel(levelid:number):Observable<TestProject>
  { 
   return this.http.post(`${this.option.controller?.name}/getprojectsbylevel`,{level:levelid},this.option.controller?.servicetype);
  }
  getprojectsbypid(pd:string):Observable<TestProject>
  { 
   return this.http.post(`${this.option.controller?.name}/getprojectsbypid`,{pid:pd},this.option.controller?.servicetype);
  }
  getalltestProject():Observable<TestProject>
  { 
   return this.http.post(`${this.option.controller?.name}/getalltestProject`,{},this.option.controller?.servicetype);
  }
  savequalification(savedata:any):Observable<any>
  {
    return this.http.post(`${this.option.controller?.name}/savequalification`,savedata,this.option.controller?.servicetype);
  }
}
export interface TestProject extends XTreeNode { 
 label?:string; 
 pid?:string;
}
@Injectable({ providedIn: 'root' })
export class QualificaitonService extends RepositoryService<Qualificaiton> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'qualifications',servicetype:'businessprocess' } });
  }
  getqualificationbysearchkey(compid:number,searchstr:string):Observable<Qualificaiton>
  { 
    return this.http.post(`${this.option.controller?.name}/getqualificationbysearchkey`
            , {companyid:compid,searchkey:searchstr}
            , this.option.controller?.servicetype); 
    
  }
}
@Injectable({ providedIn: 'root' })
export class QualificaitonServicebyid extends RepositoryService<Qualificaiton> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'qualificationsid',servicetype:'businessprocess' } });
  }
  getqualifications(ids:any[]):Observable<Qualificaiton>
  {
    if(this.option.controller !=undefined)
    return this.http.post(`${this.option.controller.name}`,ids,this.option.controller.servicetype);
    return new Observable<Qualificaiton>();
  }
}

export interface Qualificaiton extends XId { 
testprojectid?:string | number;
  methodid?:string|number;
  projectsort?:string|number;
  testproject?:string;
   methodname?:string;
   methodsort?:string|number;
  limitcomment?:string;
   price?:string|number;
   testcount?:string|number;
}
@Injectable({ providedIn: 'root' })
export class QualificationCompanyService extends RepositoryService<QualificationCompany> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'qualificationcompanys',servicetype:'businessprocess' } });
  }
}
export interface QualificationCompany extends XId{
  label?:string;
}
@Injectable({ providedIn: 'root' })
export class SampleDomainService extends RepositoryService<SampleDomain> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'domains',servicetype:'businessprocess' } });
  }
}

export interface SampleDomain extends XId{
  label?:string;
}