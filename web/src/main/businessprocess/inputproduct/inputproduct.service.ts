import { Injectable } from "@angular/core";
import { XId, XTreeNode} from "@ng-nest/ui";
import { HttpService } from "src/services/http.service";
import { RepositoryService } from "src/services/repository.service";

@Injectable({ providedIn: 'root' })
export class ProductService extends RepositoryService<Product> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'inputproduct',servicetype:'businessprocess' } });
  }
  getproductbyid(id:string)
  {
    return this.http.post(`${this.option.controller?.name}/getproductbyid`,{productid:id},this.option.controller?.servicetype);
  }
  getproduct()
  {
      return this.http.post(`${this.option.controller?.name}/getproduct`,{},this.option.controller?.servicetype);
  }
  addproduct(product:Product)
  {
    return this.http.post(`${this.option.controller?.name}/addproduct`,product,this.option.controller?.servicetype);
  }
  deleteproduct(id:string)
  {
    return this.http.post(`${this.option.controller?.name}/deleteproduct`,{productid:id},this.option.controller?.servicetype);
  }
  updateproduct(product:Product)
  {
    return this.http.post(`${this.option.controller?.name}/updateproduct`,product,this.option.controller?.servicetype);
  } 
  getqualificationbyproduct(productid:string)
  {
    return this.http.post(`${this.option.controller?.name}/getqualificationbyproduct`,{id:productid},this.option.controller?.servicetype);
  }
  getsearchproductlist(search:string)
  {
    return this.http.post(`${this.option.controller?.name}/getsearchproductlist`,{searchkey:search},this.option.controller?.servicetype);
  }
}
export interface  Product extends XTreeNode
{
    pid?:string;
    label?:string;
    price?:string|number;
    testprojects?:ProductQualification[];

}
export interface ProductQualification extends XId
{
    qualificationid?:string;
    productid?:string;
    testprojectname?:string;
    methodname?:string;
    standardprice?:string|number;
}