import { Injectable } from '@angular/core';
import { XTreeNode } from '@ng-nest/ui';
import { HttpService } from 'src/services/http.service';
import { RepositoryService } from 'src/services/repository.service';
import { Role } from '../roles/roles.service';
@Injectable({ providedIn: 'root' })
export class RoleAuditSettingService extends RepositoryService<RoleAuditSetting> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'roleauditsetting',servicetype:'flowprocess' } });
  }
    getallsetings()
    {
      return this.http.post(`${this.option.controller?.name}/getsettings`,{},this.option.controller?.servicetype);
    }
    getsettingbyid(rid:string)
    {
      return this.http.post(`${this.option.controller?.name}/getsettingbyid`,{roleid:rid},this.option.controller?.servicetype);
    }
    addsetting(setobj:RoleAuditSetting)
    {
      return this.http.post(`${this.option.controller?.name}/addsetting`,setobj,this.option.controller?.servicetype);
    }
    updatesetting(setobj:RoleAuditSetting)
    {
      return this.http.put(`${this.option.controller?.name}/updatesetting`,setobj,this.option.controller?.servicetype);
    } 
    deletesetting(setobj:RoleAuditSetting)
    {
      return this.http.delete(`${this.option.controller?.name}/deletesetting`,setobj,this.option.controller?.servicetype);
    }
    getauditvariable(rid:Role[],aut:number,auditaddvice:string)
    {
      return this.http.post(`${this.option.controller?.name}/getauditvariable`,{roles:rid,audit:aut,addvice:auditaddvice},this.option.controller?.servicetype);
    }
}

export interface RoleAuditSetting extends XTreeNode
{
    label?:string;
    pid?:string;
    role?:Role;
    auditjson?:string;
}