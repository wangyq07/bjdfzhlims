import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { map, orderBy } from 'lodash';

@Injectable()
export class ProvinceService extends XRepositoryAbstract {
   
  users: Province[] =
  [
      {id:1,label:'北京市'},
      {id:2,label:'上海市'},
      {id:3,label:'天津市'},
      {id:4,label:'重庆市'},
      {id:5,label:'广东省'},
      {id:6,label:'江苏省'},
      {id:7,label:'山东省'},
      {id:8,label:'浙江省'},
      {id:9,label:'河南省'},
      {id:10,label:'台湾省'},
      {id:11,label:'湖北省'},
      {id:12,label:'湖南省'},
      {id:13,label:'四川省'},
      {id:14,label:'甘肃省'},
      {id:15,label:'陕西省'},
      {id:16,label:'山西省'},
      {id:17,label:'江西省'},
      {id:18,label:'福建省'},
      {id:19,label:'贵州省'},
      {id:20,label:'辽宁省'},
      {id:21,label:'吉林省'},
      {id:22,label:'黑龙江省'},
      {id:23,label:'安徽省'},
      {id:24,label:'内蒙古自治区'},
      {id:25,label:'新疆维吾尔自治区'},
      {id:26,label:'西藏自治区'},
      {id:27,label:'海南省'},
      {id:28,label:'宁夏回族自治区'},
      {id:29,label:'广西壮族自治区'},
      {id:30,label:'河北省'},
      {id:31,label:'香港特别行政区'},
      {id:32,label:'澳门特别行政区'} 
  ]  

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<Province | XGroupItem>> {
    return new Observable((x) => {
      let data: Province[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        data = this.setGroup(data, query.group);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = chunk(data, size);
      if ((index as number) <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  getidbyname(name:string)
  {
    return this.users.find((x)=>x.label==name);
  }
  get(id: number | string): Observable<Province> {
    return new Observable();
  }
  post(entity: Province): Observable<Province> {
    return new Observable();
  }
  put(entity: Province): Observable<Province> {
    return new Observable();
  }
  delete(id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: any[], filters: XFilter[]): Province[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        result = result.filter((y) => y[x.field].indexOf(x.value) >= 0);
      });
    }
    return result;
  }

  private setGroup(data: Province[], group: string): XGroupItem[] {
    return map(groupBy(data, group), (value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: Province[] | XGroupItem[], sort: XSort[]): Province[] | XGroupItem[] {
    return orderBy(
      data,
      map(sort, (x) => x.field),
      map(sort, (x) => x.value) as ('desc' | 'asc')[]
    ) as Province[] | XGroupItem[];
  }
}

export interface Province extends XId {
  label?: string;
   
}