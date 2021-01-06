import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
 

@Injectable({ providedIn: 'root' })
export class CustomersService extends RepositoryService<Customer> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'customers',servicetype:'businessprocess' } });
  }
}
export interface CustomerType extends Id{
 customertype:string;
}
export interface Customer extends Id {
customername?:string;
customeraddress?:string; 
contacter?:string;
phone?:string;
fax?:string;
postcode?:string;
email?:string;
remark?:string; 
customertype?:CustomerType;
area?:string;
userid?:string;
functiontype?:string|number;
}