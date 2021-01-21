import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { Organization } from '../organization/organization.service';
import { Role } from '../roles/roles.service'; 
import { Action, Menu } from '../menus/menus.service';

@Injectable({ providedIn: 'root' })
export class UsersService extends RepositoryService<User> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'users',servicetype:'userprivilage' } });
    
  }
  getauditcustomuservice()
    {
      return this.http.post(`${this.option.controller?.name}/getauditcustomuservice`,{},this.option.controller?.servicetype);
    }
}

export interface User extends Id {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  organizations: Organization[];
  roles: Role[];
  // token
  token?: string; 
  // 权限
  permissions?: {
    actions?: Action[];
    menus?: Menu[]; };
}
