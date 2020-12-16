import { Injectable } from "@angular/core";
import { XId, XTreeNode } from "@ng-nest/ui";
import { HttpService } from "src/services/http.service";
import { RepositoryService } from "src/services/repository.service";

@Injectable({ providedIn: 'root' })
export class DispatchRoleTaskService extends RepositoryService<RoleTestProject> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'roletestproject',servicetype:'collectionreceive' } });
  }
  
  getroletaskdispatchs(contact:string)
  {
      return this.http.post(`${this.option.controller?.name}/getroletaskdispatchs`,{contactid:contact},this.option.controller?.servicetype);
  }
  addRoleTaskDispatch(contact:string,rolep:any[])
  {
    return this.http.post(`${this.option.controller?.name}/addroletaskdispatch`,{contactid:contact,roletestproect:rolep},this.option.controller?.servicetype);
  }
}
export interface RoleTestProject extends XTreeNode
{
 pid?:string;
 label?:string;
 level?:number;
 taskdispatchs?:DispatchRoleTask[];
}
export interface DispatchRoleTask extends XId
{
     roleid?:string;
	 testid?:string;
	 sampleid?:string;
	 receivequality?:string; 
	 screendiameter?:string;
}