import { Injectable } from '@angular/core';
import { Id, RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XId } from '@ng-nest/ui';
import { Menu } from 'src/main/system/menus/menus.service';
import { Role } from 'src/main/system/roles/roles.service';
 

@Injectable({ providedIn: 'root' })
export class FlowNodeService extends RepositoryService<FlowTask> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'flownodes',servicetype:'flowprocess' } });
  }
  bymaxid(maxid:string,currentid:string)
  {
    return this.http.post(`${this.option.controller?.name}/bymaxid`,{maxid:maxid,currentid:currentid},this.option.controller?.servicetype);
  }
}

 
export interface FlowTask extends XTreeNode{ 
label?:string;
flowid?:string;
tasknodeid?:string;
pid?:string;
processkey?:string;
menu?:Menu;
roles?:FlowRole[];
handleclass?:string;
specialdispatch?:FlowSpecialDispatch[];
sort?:string|number;  
}
export interface FlowRole extends XId{
   tasnodekid?:string;
   roleid?:string;
   label?:string; 
}
export interface FlowSpecialDispatch extends Id
{
  flowid?:string;
  tasknodeid?:string; 
  conditionid?:number;
  conditionname?:number
  role:Role; 
  conditionstring:string;
}
