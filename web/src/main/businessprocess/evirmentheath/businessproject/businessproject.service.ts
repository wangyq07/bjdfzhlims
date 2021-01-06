import { Injectable } from '@angular/core';
import { XId } from '@ng-nest/ui';
import { HttpService } from 'src/services/http.service';
import { RepositoryService } from 'src/services/repository.service';
import { Sample } from 'src/services/sample.service';
@Injectable({ providedIn: 'root' })
export class ContactProjectService extends RepositoryService<BusinessProjects> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'contactprojects',servicetype:"businessprocess" } });
  }
   getprojects(contactid:string)
  {
       return this.http.post(`${this.option.controller?.name}/getprojects`,{id:contactid},this.option.controller?.servicetype);
  }
}
@Injectable({ providedIn: 'root' })
export class RecieveSampleFormService extends RepositoryService<CommonType> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'recievesampleforms',servicetype:"businessprocess" } });
  }
}
export interface BusinessProjects extends XId
{
  projects:BusinessProject[];
}
export interface BusinessProject extends XId
{
    contactid?:string; 
    projectnumber?:string; 
    reportcount?:number; 
    domain?:CommonType; 
    projectstatus?:string|number;
    samples?:Sample[]; 
    domainlabel?:string; 
    mergereport?:number;
    createdate?:string|Date;
}
export interface ContactCustomer extends XId
{ 
contactid?:string;
customerid?:string|number;
customername?:string;
area?:string;
phone?:string;
customeraddress?:string;
contacter?:string;
customertype?:string|number; 
}
export interface CommonType extends XId
{
  label?:string;
  code?:string;
}
@Injectable({ providedIn: 'root' })
export class SealService extends RepositoryService<CommonType> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'seals',servicetype:"businessprocess" } });
  }
  gettesttype()
  {
    return this.http.post(`testtype`,{},this.option.controller?.servicetype);
  }
  getsamplestatus()
  {
    return this.http.post(`samplestatus`,{},this.option.controller?.servicetype);
  }
  getsamplestore()
  {
    return this.http.post(`samplestore`,{},this.option.controller?.servicetype);
  }
  getsampleprocess()
  {
    return this.http.post(`sampleprocess`,{},this.option.controller?.servicetype);
  }
}
@Injectable({ providedIn: 'root' })
export class ServiceTypesService extends RepositoryService<ServiceType> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'servicetypes',servicetype:"businessprocess" } });
  }

}
export interface ServiceType extends XId
{
  label?:string;
  discount?:number;
}