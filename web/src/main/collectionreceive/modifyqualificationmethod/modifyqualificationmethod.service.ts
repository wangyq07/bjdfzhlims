import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Qualification } from "src/main/qualification/qualification.service";
import { HttpService } from "src/services/http.service";
import { Id, RepositoryService } from "src/services/repository.service";
@Injectable({ providedIn: 'root' })
export class QualificationMethodService extends RepositoryService<Qualification> {
  constructor(public http: HttpService) {
  super(http, { controller: { name: 'qualificationmethods',servicetype:'businessprocess' } });
  }
  getqualificationmethods(testprojectid:string)
  { 
    return this.http.post(`${this.option.controller?.name}/getqualificationmethods`
            , {id:testprojectid}
            , this.option.controller?.servicetype); 
    
  }
  getqualificationmethodbysearchkey(projectname:string,methodname:string)
  { 
    return this.http.post(`${this.option.controller?.name}/getqualificationmethodbysearchkey`
            , {project:projectname,method:methodname}
            , this.option.controller?.servicetype); 
    
  }
  addqualificationmethod(adddata:any)
  {
    return this.http.post(`${this.option.controller?.name}/addqualificationmethod`,adddata,this.option.controller?.servicetype);
  }
  updatequalificationmethod(updatedata:any[])
  {
    return this.http.post(`${this.option.controller?.name}/updatequalificationmethod`,{updatelist:updatedata},this.option.controller?.servicetype);
  }
  deletequalificationmethod(deletedata:any)
  {
    return this.http.delete(`${this.option.controller?.name}/deletequalificationmethod`, deletedata ,this.option.controller?.servicetype);
  }

}
 