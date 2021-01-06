import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { isArray } from 'lodash';
import * as moment from 'moment';

 export class ProjectUtil
{
 
    static JsNewGuid() {
        var curguid = "";
        for (var i = 1; i <= 32; i++) {
            var id = Math.floor(Math.random() * 16.0).toString(16);
            curguid += id;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                curguid += "-";
        }
        return curguid;
    }
     
    static setafterdelete(id:string,tabledata:any[])
    {
      
      var delindex=  tabledata.findIndex((y)=>{return y.id==id}); 
         tabledata.splice(delindex,1);  
         return delindex;
        
    }
    static cloneobject(objc:any):any
    {
       var retobj:any={};
       for(var attr in objc)
       {
          retobj[attr]=objc[attr];
       }
      return retobj;
    }
     static deepClone(obj:any){
      var objClone:any={};

      if(obj && typeof obj==="object"){
          for(var key in obj){
            if(obj[key]==undefined)
            {
               
               continue;
            }
              if(obj.hasOwnProperty(key)){
                  //判断ojb子元素是否为数组，如果是，调用数组复制
                  if( isArray( obj[key]))
                  {
                    objClone[key]= ProjectUtil.deepcloneobjectarray(obj[key] as any[]);
                  }
                   //判断ojb子元素是否为对象，如果是，递归复制
                  else if(obj[key]&&typeof obj[key] ==="object"){
                      objClone[key] = ProjectUtil.deepClone(obj[key]);
                  }else{
                      //如果不是，简单复制
                      objClone[key] = obj[key];
                  }
              }
          }
      }
      return objClone;
  } 
  static deepcloneobjectarray(objc:any[]):any[]
  {
    var retobj:any[]=[];
    for(var i=0;i<objc.length;i++)
    {
        retobj.push(ProjectUtil.deepClone(objc[i]));
    }
   return retobj;
  }   
    /*只支持单对象，嵌套对象不支持*/
    static cloneobjectarray(objc:any[]):any[]
    {
       var retobj:any[]=[];
       for(var i=0;i<objc.length;i++)
       {
           retobj.push(ProjectUtil.cloneobject(objc[i]));
       }
      return retobj;
    }
    static GetRandomStr(randomFlag:boolean, min:number, max:number){
        var str = "",
          range = min,
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if(randomFlag){
          range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
          var pos = Math.round(Math.random() * (arr.length-1));
          str += arr[pos];
        }
        return str;
      }
     static num=ProjectUtil.RndNum(5);
     static RndNum(n:number) {
      var rnd = "";
      for (var i = 0; i < n; i++)
          rnd += Math.floor(Math.random() * 10);
      return rnd;
  }  
  static getMareData(projects:any[],judgement:string)
  {
    var p=0;var q=0;
    var pindex=0;var qindex=0;
    var pdata:any[]=[];
    var sdata:any[]=[];
    let data:any[]=[];
     projects.map(
       (x)=>
       {
          p=0;
         x.samples?.map(
          (y:any)=>
          {
              q=0;  
              y.testprojects?.map(
                (z:any)=>
                { 
                  if(z.testproject!=undefined&&z.testproject!='')
                  {
                  p=p+1;
                  q=q+1;
                   data.push(
                    {
                      projectid:x.id,
                      sampleid:y.id,
                      projectname:x.projectnumber, 
                      samplename:y.samplename,
                      brand:y.brand, 
                      samplespec:y.samplespect,
                      samplequality:y.samplequality,
                      manudate:moment(y.manudate).format('YYYY.MM.DD'),
                      executegrade:y.executegrade,
                      specialcondition:y.specialcondition,
                      wrapherproperties:y.wrapherproperties+','+y.status.label,
                      judge:judgement,
                      deleverdate:moment(y.deleverdate).format('YYYY.MM.DD'),
                      testproject:z.testproject,
                      standardname:z.standardname,
                      roleid:z.roleid,
                      userid:z.userid,
                      executestandard:y.executestandard,

                    }
                  
                  ); 
                }
                }
                 
              );
              sdata.push({id:y.id,rowspan:q,index:qindex});
              qindex=qindex+q;
          }
         );
         pdata.push({id:x.id,rowspan:p,index:pindex});
         pindex=pindex+p;
       }
     );
     var i=0;
     data.map(
       (x)=>
       {
         var ffindex= pdata.findIndex((y)=>y.id==x.projectid);
         if(ffindex !=-1)
         {
           x.projectrowspan=pdata[ffindex].rowspan;
           x.projectindex=pdata[ffindex].index;
         }
         ffindex= sdata.findIndex((y)=>y.id==x.sampleid);
         if(ffindex !=-1)
         {
           x.samplerowspan=sdata[ffindex].rowspan;
           x.sampleindex=sdata[ffindex].index;
         }
         x.testprojectindex=i;
         x.testprojecrowspan=1;
         i=i+1;
       }
     );
     return data;
  }
  
}
export interface AdditionalData
{
  projectid?:string;
  sampleid?:string;
  projectindex?:number;
  sampleindex?:number;
  projectrowspan?:number;
  samplerowspan?:number;
  projectname?:string; 
  samplename?:string; 
  brand?:string; 
  samplespec?:string;
  samplequality?:number;
  manudate?:string;
  executegrade?:string;
  specialcondition?:string;
  wrapherproperties?:string;
  judge?:string;
  deleverdate?:string;
  testproject?:string;
  standardname?:string;  
  executestandard?:string;
  roleid?:string;
  userid?:string;
  testprojectindex?:number;
  testprojecrowspan?:number;
}