import { XQuery, XResultList } from '@ng-nest/ui';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface Id {
  id?: string | number;
}

export interface Controller {
  name?: string;
  servicetype:string;
}

export interface RepositoryOption {
  controller?: Controller;
}

export interface ResultList<Entity extends Id> {
  list?: Entity[];
  total?: number;
  query?: Query;
}

export interface Query {
  index?: number;
  size?: number;
  sort?: Sort[];
  filter?: Filter[];
  group?: string;
}

export interface Sort extends Filter {}

export interface Filter {
  field: string;
  value: string;
  operation?: Operation;
  relation?: string;
}

export type Operation = '%' | '=' | '>' | '>=' | '<' | '<=' | '';

export class RepositoryService<Entity extends Id> {
  constructor(public http: HttpService, public option: RepositoryOption) {}
  getservicetype()
  {
    //alert("test");
    //console.log(this.option.controller);
    var servicetype=this.option.controller?.servicetype;
   if(servicetype==undefined||servicetype=="")
   {
     servicetype="userprivilage"
   }
   
   return servicetype;
  }
  getList(index?: number, size?: number, query?: Query): Observable<ResultList<Entity>> {
    index = index ? index : 1;
    size = size ? size : 10;
    if(query !=undefined)
    {
    query.size=size;
    query.index=index;
  }
  else
  {
    query={size:size,index:index,filter:[]};
  }
  console.log(query);
    return this.http.post(`${this.option.controller?.name}/${size}/${index}`, query,this.getservicetype());
  }

  get(id: number | string): Observable<Entity> {
    //console.log(this.getservicetype());
    //var servicetype=this.getservicetype();
    return this.http.get(`${this.option.controller?.name}/${id}`,id,false,this.getservicetype());
  }

  post(entity: Entity): Observable<Entity> {
    return this.http.post(`${this.option.controller?.name}`, entity,this.getservicetype());
  } 
  put(entity: Entity): Observable<Entity> {
    return this.http.put(`${this.option.controller?.name}`, entity,this.getservicetype());
  }

  delete(id: number | string): Observable<boolean> {
    return this.http.delete(`${this.option.controller?.name}/${id}`,id,this.getservicetype());
  }
   
  gethandledata(localdata:any[],index?: number, size?: number, query?: XQuery): Observable<XResultList<any>>
  {
    return this.http.gethandledata(localdata,index,size,query);
  }
}
