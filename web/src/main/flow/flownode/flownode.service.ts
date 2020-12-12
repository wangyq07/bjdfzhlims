import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XId } from '@ng-nest/ui';
import { Menu } from 'src/main/system/menus/menus.service';
 

@Injectable({ providedIn: 'root' })
export class FlowNodeService extends RepositoryService<FlowTask> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'flownodes',servicetype:'flowprocess' } });
  }
  
}

 
export interface FlowTask extends XTreeNode{ 
label?:string;
tasknodeid?:string;
pid?:string;
processkey?:string;
menu?:Menu;
roles?:FlowRole[];
sort?:string|number;  
}
export interface FlowRole extends XId{
   tasnodekid?:string;
   roleid?:string;
   label?:string; 
}
