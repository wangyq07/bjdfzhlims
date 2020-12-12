import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { map, orderBy } from 'lodash';
import { XTreeNode } from '@ng-nest/ui/tree';
import { Qualificaiton, QualificaitonService } from 'src/main/qualification/qualification.service';
 
  
@Injectable()
export class GetQualificationService extends XRepositoryAbstract {
  constructor(private service:QualificaitonService){
      super();
       this.service.getList().subscribe((x)=>
       {
           this.qualifications=x.list as any[];
       }
       );
  };
  qualifications: any[] =[];

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<any | XGroupItem>> {
    return new Observable((x) => {
      let data: Qualificaiton[] | XGroupItem[] = [];
      data = this.setFilter(this.qualifications, query?.filter as XFilter[]);
      if (query?.group) {
        console.log(data, index, size, query);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = chunk(data, size);
      let result = { total: 0, list: [] };
      if ((index as number) <= chunks.length) {
        result.total = data.length;
        result.list = chunks[index - 1] as [];
      } else {
        result.total = data.length;
      }
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 10);
    });
  }
  get(id: number | string): Observable<Qualificaiton> {
    return new Observable();
  }
  post(entity: Qualificaiton): Observable<Qualificaiton> {
    return new Observable();
  }
  put(entity: Qualificaiton): Observable<Qualificaiton> {
    return new Observable();
  }
  delete(id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: any[], filters: XFilter[]): any[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        switch (x.operation) {
          case '=':
            result = result.filter((y) => y[x.field] === x.value);
            break;
          case '>':
            result = result.filter((y) => y[x.field] > x.value);
            break;
          case '>=':
            result = result.filter((y) => y[x.field] >= x.value);
            break;
          case '<':
            result = result.filter((y) => y[x.field] < x.value);
            break;
          case '<=':
            result = result.filter((y) => y[x.field] <= x.value);
            break;
          default:
            // '%'
            result = result.filter((y) => y[x.field].indexOf(x.value) >= 0);
            break;
        }
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

@Injectable()
export class TreeServiceTest {
  data: XTreeNode[] = [];

  getTreeList = (pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(this.data);
        x.complete();
      }, 10);
    });
  };
}

 