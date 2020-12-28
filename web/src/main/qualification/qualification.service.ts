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
  
}
export interface TestProject extends XTreeNode { 
 label?:string; 
 pid?:string|number;
}
@Injectable({ providedIn: 'root' })
export class QualificaitonService extends RepositoryService<Qualificaiton> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'qualifications',servicetype:'businessprocess' } });
  }
  getqualificationbysearchkey(compid:number,projectname:string,methodname:string):Observable<Qualificaiton>
  { 
    return this.http.post(`${this.option.controller?.name}/getqualificationbysearchkey`
            , {companyid:compid,project:projectname,method:methodname}
            , this.option.controller?.servicetype); 
    
  }
  addqualification(adddata:any):Observable<any>
  {
    return this.http.post(`${this.option.controller?.name}/addqualification`,adddata,this.option.controller?.servicetype);
  }
  updatequalification(updatedata:any):Observable<any>
  {
    return this.http.post(`${this.option.controller?.name}/updatequalification`,updatedata,this.option.controller?.servicetype);
  }
  deletequalification(id:string)
  {
    return this.http.post(`${this.option.controller?.name}/deletequalification`,{qualificationid:id},this.option.controller?.servicetype);
  }
}
@Injectable({ providedIn: 'root' })
export class QualificaitonServicebyid extends RepositoryService<Qualificaiton> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'qualificationsid',servicetype:'businessprocess' } });
  }
  getqualifications(ids:any[]):Observable<Qualificaiton>
  {
 
    return this.http.post(`${this.option.controller?.name}`,ids,this.option.controller?.servicetype);
    
  }
}

export interface Qualificaiton extends XId { 
  firstid?:string|number;
  secondid?:string|number;
  firstname?:string|number;
  secondname?:string;
testprojectid?:string | number;
  methodid?:string|number;
  standardid?:string|number;
  standardname?:string|number;
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