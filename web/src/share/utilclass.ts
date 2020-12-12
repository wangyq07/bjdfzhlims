import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { isArray } from 'lodash';

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
  
      
}