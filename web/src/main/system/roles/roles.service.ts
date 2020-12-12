import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { Organization } from '../organization/organization.service';
import { Action } from '../menus/menus.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolesService extends RepositoryService<Role> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'roles',servicetype:'userprivilage' } });
  }

  getActions(id: string, menuId: string): Observable<Action[]> {
    return this.http.get(`${this.option.controller?.name}/actions/${id}/${menuId}`);
  }

  putActions(id: string, menuId: string, actions: Action[]): Observable<any> {
    return this.http.put(`${this.option.controller?.name}/actions/${id}/${menuId}`, { actions: actions });
  }
  deleteActionmap(id:string,menuId:string) : Observable<any>
  {
   return this.http.delete(`${this.option.controller?.name}/actions/${id}/${menuId}`);
  }
}

export interface Role extends Id {
  name: string;
  organization: Organization;
}
