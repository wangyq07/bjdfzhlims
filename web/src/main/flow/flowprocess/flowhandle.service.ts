import { Injectable } from '@angular/core';
import { XId, XQuery } from '@ng-nest/ui';
import { Observable } from 'rxjs';
import { BusinessProject } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { Role } from 'src/main/system/roles/roles.service';
import { Contact } from 'src/services/ContactService';
import { HttpService } from 'src/services/http.service'; 
@Injectable({ providedIn: 'root' })
export class FlowService {
    constructor(public http: HttpService ) {}
    name="activity";
    getservicetype()
    { 
     return 'flowprocess';
    }
    startflow(entkty:Flow)  
    {
      return this.http.post(`${this.name}/start`,entkty,this.getservicetype());
    }
    getTaskListByRoleId(rlids:Role[],uid:string):Observable<any> 
    {
      return this.http.post(`${this.name}/gettasksbypara`,{roles:rlids,userid:uid,iscomplete:false},this.getservicetype()); 
    }
    getTaskListByUserId(uid:string):Observable<any> 
    {
      return this.http.post(`${this.name}/gettasksbypara`,{userid:uid,iscomplete:true},this.getservicetype()); 
    }
    getTaskListByUserIdInstanceId(uid:string,insid:string):Observable<any> 
    {
      return this.http.post(`${this.name}/gettasksbypara`,{userid:uid,instanceid:insid,iscomplete:false},this.getservicetype()); 
    }
    getallProcesses():Observable<any> 
    {
        return this.http.post(`${this.name}/allprocess`,null,this.getservicetype()); 
    }
    excutetask(takid:string,frmkey:any)
    {
      return this.http.post(`${this.name}/excutetask`,{taskid:takid,formkey:frmkey},this.getservicetype());
    }
    getDiagram(query:XQuery)
    {
       return this.http.post(`${this.name}/showImg`,query,this.getservicetype());
    }
     deployDiagram(filename:string)
     {
      return this.http.post(`${this.name}/deploy`,{file:filename},this.getservicetype()); 
     }
     getcontactbyproject(prid:string)
     {
      return this.http.post(`contactprojectcustomer/getcontactbyproject`,{contact:prid},this.getservicetype()); 
     }
     getassignees(param:any)
     {
      return this.http.post(`${this.name}/getassignees`, param ,this.getservicetype()); 
     }
  }
  export interface Flow extends XId{
    contactid?:string; 
    username?:string;
    userid?:string|number;
    roles?:Role[];
    assignee?:String;
    customername?:string;
    instanceKey?:string;
  }
  export interface Task extends XId{
    taskid?:string;
     name?:string;
     createtime?:Date|string;
     assignee?:string;
     instanceid?:string;
     executionId?:string;
     definitionid?:string;
     taskdefinid?:string;
    variable?:any;
    from?:string;
    preuser?:string;
    customername?:string;
    router?:string;
    contactid?:string;
    urgency?:number;
    limitdiscount?:number;
    qupricediscount?:number;
    isextern?:number;
    endTime?:Date|string; 
  }
  
