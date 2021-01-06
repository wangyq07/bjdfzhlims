import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { CommonType, ContactCustomer } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
@Injectable({ providedIn: 'root' })
export class ContactService extends RepositoryService<Contact> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'contacts',servicetype:"businessprocess" } });
  }
  //更新三个数据表
  updatecontactinfo(contactobj:Contact)
  {
    return this.http.post(`${this.option.controller?.name}/updatecontactinfo`,contactobj,this.option.controller?.servicetype);
  }
  getcontactproject(contacid:string)
  {
	return this.http.post(`${this.option.controller?.name}/getcontactproject`,{contactid:contacid},this.option.controller?.servicetype);
  }
  addcontactproject(additem:any)
  {
	return this.http.post(`${this.option.controller?.name}/addcontactproject`,additem,this.option.controller?.servicetype);
  }
  updatecontacttest(modifytest:any)
  {
	return this.http.post(`${this.option.controller?.name}/updatecontacttest`,modifytest,this.option.controller?.servicetype);
  }
}

export interface Contact extends Id { 
	contactversion?:string;
	customerid?:string|number; 
	judgement?:string;
	signdate?:string|Date;  
	isjudgement?:string|number;
	isextern?:string|number;
	judgementstandard?:string;
	collectionfee?:string|number;
	businessfee?:string|number;
	externfee?:string|number;
	 excutegrade?:string;
     seal?:CommonType[];
	 service?:CommonType; 
     testfee?:string|number;
	 totalfee?:string|number;
	 standardfee?:string|number;
	 samplesource?:CommonType;
	 discount?:string|number;
	 remark?:string; 
	 userid?:string;
	 ugency?:string;
	 contactstatus?:string|number;
	 urgencyfee?:string|number;
	 processid?:string|number;
	 contactcustomers?:ContactCustomer[];
}
@Injectable({ providedIn: 'root' })
export class ContactTestProjectService extends RepositoryService<ContactTestProjects> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'contacttests',servicetype:"businessprocess" } });
  }
}
export interface ContactTestProjects extends Id
{
	contacttests:ContactTestProject[];
}
export interface ContactTestProject extends Id {  
sampleid?:string;
qualificationid?:string;
testproject?:string;
methodname?:string;
standardname?:string;
outsitecustomerid?:string;
remark?:string;
price?:string|number;
isextern?:string|number;
realprice?:string|number;
testcount?:string|number;
limitmax?:string|number;
limitmin?:string|number;
roleid?:string;
userid?:string;
}
