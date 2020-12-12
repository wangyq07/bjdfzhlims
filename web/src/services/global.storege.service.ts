import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class GlobalSaveService { 
    set(key:string,value:string)
    {
        window.localStorage.setItem(key,value);
    } 
    get(key:string):string
    {
        return window.localStorage.getItem(key)||'';
    }
    setObject(key:string,value:any){
        window.localStorage .setItem(key,JSON.stringify(value));
      }
         //读取对象
      getObject(key:string):any {
        return JSON.parse(window.localStorage.getItem(key) || '{}');
      }
}
export class testobj
{
  id:string;
  name:string;
  type:string;
  flag:boolean;
  constructor(ID:string,Name:string,Type:string){
    this.id=ID;
    this.name=Name;
    this.type=Type;
  }
}