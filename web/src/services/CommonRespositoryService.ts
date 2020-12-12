import { Injectable } from '@angular/core';
import { LogicOperiton, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable } from 'rxjs'; 
import { map, orderBy } from 'lodash';
@Injectable()
export class CommonService<Entity extends XId, Query extends XQuery> { 
    localdata:any[]=[];
    setlocaldata(data:any[])
    {
      this.localdata=data;
    }
    getList(localdata:any[],index?: number, size?: number, query?: XQuery): Observable<XResultList<any>> {
        return new Observable((x) => {
            let data: any[] | XGroupItem[] = []; 
            data = this.setFilter(localdata,query?.filterLogic as LogicOperiton||'and', query?.filter as XFilter[]);
             
              x.complete();
            });
    }
    get(id: string | number): Observable<any> {
         return new Observable();
    }
    post(entity: any): Observable<any> {
         return new Observable(); 
    }
    put(entity: any): Observable<any> {
        
        return new Observable(); 
    }
    delete(id: string | number): Observable<boolean> {
        return new Observable(); 
    }
    private setFilter(data: any[],filterLogic:LogicOperiton, filters: XFilter[]): any[] {
        let result=data;
          
        if (filters && filters.length > 0) {
            result=data.filter((x)=>
            { 
              var retflag=false;
              if(filterLogic=="or")
              {
              for(var  i=0;i<filters.length;i++)
              {

                 if(x[filters[i].field].indexOf(filters[i].value)>=0)
                 {
                   retflag=true;
                   break;
                 }
              }
            }
             else if(filterLogic=="and")
             {
              retflag=true;
             for(var  i=0;i<filters.length;i++)
             {
                if(x[filters[i].field].indexOf(filters[i].value)==-1)
                {
                  retflag=false;
                  break;
                }
             }
           }
              return retflag;
            });
          
        }
          
        return result;
      }
    
      private setGroup(data: any[], group: string): XGroupItem[] {
        return map(groupBy(data, group), (value, key) => {
          let groupItem: XGroupItem = { id: key, count: value.length };
          groupItem[group] = key;
          return groupItem;
        });
      }
    
      private setSort(data: any[] | XGroupItem[], sort: XSort[]): any[] | XGroupItem[] {
        return orderBy(
          data,
          map(sort, (x) => x.field),
          map(sort, (x) => x.value) as ('desc' | 'asc')[]
        ) as any[] | XGroupItem[];
      }
}