import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service'; 
import { XTreeNode } from '@ng-nest/ui/tree'; 
import { Role } from '../roles/roles.service';

@Injectable({ providedIn: 'root' })
export class RoleDiscountService extends RepositoryService<RoleDiscount> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'rolediscount',servicetype:'flowprocess' } });
  }
  getdiscounts()
  {
     return this.http.post(`${this.option.controller?.name}/getdiscounts`,{},this.option.controller?.servicetype);
  }
  getrolediscountbyid(dmid:string,rid:string)
  {
    
    return this.http.post(`${this.option.controller?.name}/getrolediscountbyid`
                            ,{domainid:dmid==undefined?'':dmid,
                             roleid:rid==undefined?'':rid
                             },this.option.controller?.servicetype);
  }
  addrolediscount(item:any)
  {
      return this.http.post(`${this.option.controller?.name}/addrolediscount`,item,this.option.controller?.servicetype);
  }
  updaterolediscount(item:any)
  {
      return this.http.post(`${this.option.controller?.name}/updaterolediscount`,item,this.option.controller?.servicetype);
  }
  deleterolediscount(item:any)
  {
      return this.http.delete(`${this.option.controller?.name}/deleterolediscount`,item,this.option.controller?.servicetype);
  }
  getrolediscountvaluebyid(areastr:string,ros:any[])
  {
        return this.http.post(`${this.option.controller?.name}/getrolediscountvaluebyid`,{area:areastr,roles:ros},this.option.controller?.servicetype);
  }
} 
export interface RoleDiscount extends XTreeNode{
    label?:string;
    pid?:string;
    discount?:string|number;
    role?:Role; 
}