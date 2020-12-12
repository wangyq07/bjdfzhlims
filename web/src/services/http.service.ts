import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingService } from './setting.service';
import { XMessageService } from '@ng-nest/ui/message';
import { XMessageBoxService } from '@ng-nest/ui/message-box'; 
import { LogicOperiton, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
 
import { map, orderBy } from 'lodash';

/**
 * http请求
 *
 * @export
 * @class HttpService
 */

@Injectable({ providedIn: 'root' })
export class HttpService {
  api: string;
  constructor(
    public http: HttpClient,
    public setting: SettingService,
    public message: XMessageService,
    public msgBox: XMessageBoxService
  ) 
  {
    
  }

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  get(url: string, params?: any, isBody?: boolean,servicetype?:string) {
     //console.log(servicetype);
    return this.request('GET', url, params, isBody,servicetype);
  }

  /**
   * get请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  post(url: string, params?: any,servicetype?:string): Observable<any> {
    
    return this.request('POST', url, params,false,servicetype);
  }

  /**
   * put请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  put(url: string, params?: any,servicetype?:string): Observable<any> {
    return this.request('PUT', url, params,false,servicetype);
  }

  /**
   * delete请求
   *
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  delete(url: string, params?: any,servicetype?:string): Observable<any> {
     
    return this.request('DELETE', url, params,false,servicetype);
  }

  /**
   * request通用请求
   *
   * @private
   * @param {string} method 请求类型
   * @param {string} url 地址
   * @param {any} [params] 参数
   * @returns
   * @memberof HttpService
   */
  request(method: string, url: string, params?: any, isBody = false,servicetype?:string): Observable<any> {
    let option = {};  
    if(servicetype==undefined||servicetype=="")
    {
      servicetype="userprivilage";
    }
     
    url = `${environment.apis.find((x)=>x.servicetype==servicetype)?.api}${url}`;
    
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].indexOf(method) > -1 || isBody) {
      option = { body: params };
    } else if (['GET'].indexOf(method) > -1) {
      option = { params: params };
    }
    this.addHeader(option); 
    return new Observable((x) => {
      this.http.request(method, url, option).subscribe(
        (y: any) => {
          x.next(y);
          x.complete();
           
        },
        (y) => {
          x.error(y);
          x.complete();
          this.handleError(y);
        },
        () => {
          x.complete();
        }
      );
    });
  }

  /**
   * 错误处理
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof HttpService
   */
  handleError(error: HttpErrorResponse) {
    if (error.error) {
      this.message.error({
        placement: 'center',
        effect: 'light',
        width: '20rem',
        hideClose: false,
        title: error.error.message,
        content: error.error.data
      });
    }
    return throwError(error.error);
  }

  /**
   * 添加头部信息
   *
   * @private
   * @param {*} option
   * @memberof HttpService
   */
  private addHeader(option: any) {
    let auth = this.setting.getSession('Auth');
    if (auth && auth['token']) {
      option['headers'] = { Authorization: `Bearer ${auth['token']}` };
    }
  }
  gethandledata(localdata:any[],index?: number, size?: number, query?: XQuery): Observable<XResultList<any>>
  {
    return new Observable((x) => {
      let data: any[] | XGroupItem[] = [];
      //console.log(this.localdata);
      data = this.setFilter( localdata,query?.filterLogic as LogicOperiton||'and', query?.filter as XFilter[]);
      if (query?.group) {
          data = this.setGroup(data, query.group);
        }
        if (query?.sort) {
          data = this.setSort(data as any[], query.sort);
        }
        let chunks = chunk(data, size);
         
        if ((index as number) <= chunks.length) {
          x.next({ total: data.length, list: chunks[index as number - 1] });
        } else {
           if(data !=undefined)
          x.next({ total: data.length, list: [] });
        }
        x.complete();
      });
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
