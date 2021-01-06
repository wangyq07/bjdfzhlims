import { Injectable } from "@angular/core";
import { XId, XTreeNode} from "@ng-nest/ui";
import { HttpService } from "src/services/http.service";
import { RepositoryService } from "src/services/repository.service";

@Injectable({ providedIn: 'root' })
export class PriceProductService extends RepositoryService<PriceProduct> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'inputprice',servicetype:'businessprocess' } });
  }
  getpriceproductbyid(id:string)
  {
    return this.http.post(`${this.option.controller?.name}/getpriceproductbyid`,{priceid:id},this.option.controller?.servicetype);
  }
  getpriceproduct()
  {
      return this.http.post(`${this.option.controller?.name}/getpriceproduct`,{},this.option.controller?.servicetype);
  }
  addpriceproduct(product:PriceProduct)
  {
    return this.http.post(`${this.option.controller?.name}/addpriceproduct`,product,this.option.controller?.servicetype);
  }
  deletepriceproduct(id:string)
  {
    return this.http.post(`${this.option.controller?.name}/deletepriceproduct`,{priceid:id},this.option.controller?.servicetype);
  }
  updatepriceproduct(product:PriceProduct)
  {
    return this.http.post(`${this.option.controller?.name}/updatepriceproduct`,product,this.option.controller?.servicetype);
  }
  getCurrentQualificationexists(qualss:PriceQualification[])
  {
    return this.http.post(`${this.option.controller?.name}/getCurrentQualificationexists`,{quals:qualss},this.option.controller?.servicetype);
  }
}
export interface PriceProduct extends XTreeNode
{
    pid?:string;
    label?:string;
    formular?:string;
    limitprice?:string|number;
    mincount?:string|number;
    perdecreace?:string|number;
    prices?:PriceQualification[];

}
export interface PriceQualification extends XId
{
    qualificationid?:string;
    priceid?:string;
    testprojectname?:string;
    methodname?:string;
    standardprice?:string|number;
    standardname?:string;
    exceptionprice?:string|number; 
}