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
                      reportcount:x.reportcount,
                      domain:x.domain.label, 
                      sampleprice:y.price,
                      extern:z.isextern==0?'否':'是',
                      samplename:y.samplename,
                      brand:y.brand, 
                      samplespec:y.samplespec,
                      samplequality:y.samplequality,
                      manudate:moment(y.manudate).format('YYYY.MM.DD'),
                      executegrade:y.executegrade,
                      specialcondition:y.specialcondition,
                      wrapherproperties:y.wrapherproperties+','+(y.status !=undefined?y.status.label:''),
                      judge:judgement,
                      deleverdate:moment(y.deleverdate).format('YYYY.MM.DD'),
                      testproject:z.testproject,
                      standardname:z.standardname,
                      roleid:z.roleid,
                      userid:z.userid,
                      testprojectid:z.testprojectid,
                      standardid:z.standardid,
                      executestandard:y.executestandard,
                      qualificationid:z.qualificationid,
                      testcount:z.testcount,
                      beforeuserid:z.userid,
                      beforeroleid:z.roleid,
                      beforequalificationid:z.qualificationid,
                      methodname:z.methodname,
                      methodid:z.methodid,
                      price:z.price,
                      realprice:z.realprice
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
  static SectionToChinese(section:number){
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
      var v = section % 10;
      if(v === 0){
        if(!zero){
          zero = true;
          chnStr = ProjectUtil.chnNumChar[v] + chnStr;
        }
      }else{
        zero = false;
        strIns = ProjectUtil.chnNumChar[v];
        strIns += ProjectUtil.chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  }
   static chnNumChar:any[] = ["零","一","二","三","四","五","六","七","八","九"];
   static chnUnitSection:any[] = ["","万","亿","万亿","亿亿"];
   static chnUnitChar:any[] = ["","十","百","千"];
 static NumberToChinese(num:number){
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;
   
    if(num === 0){
      return ProjectUtil.chnNumChar[0];
    }
   
    while(num > 0){
      var section = num % 10000;
      if(needZero){
        chnStr = ProjectUtil.chnNumChar[0] + chnStr;
      }
      strIns = ProjectUtil.SectionToChinese(section);
      strIns += (section !== 0) ? ProjectUtil.chnUnitSection[unitPos] : ProjectUtil.chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      num = Math.floor(num / 10000);
      unitPos++;
    } 
    return chnStr;
  }
  static setsamplelabel(x:any,contact:any,processes:any[])
 {
   x.storelabel=x.store?.label;
   x.testtypelabel=x.testtype?.label;
   x.statuslabel=x.status?.label; 
  var contactCustomer = contact.contactcustomers?.find((x:any)=>x.customertype=3); 
  if(contactCustomer !=undefined)
  {
    x.manuuser=contactCustomer.customername+'';
    x.manuaddr=contactCustomer.customeraddress+'';
  }
   if(contact!=undefined&&contact.processid!=undefined)
   {
     var process= processes.find((x)=>x.id==contact.processid);
     if(process !=undefined)
     x.processlabel=process.label;
   }
   if(x.deleverdate !=null && x.deleverdate !=undefined)
   {
      x.deleverdatelabel=moment( x.deleverdate).format('YYYY.MM.DD');
      x.deleverdate=new Date(moment( x.deleverdate).format('YYYY-MM-DD'));
   }
   if(x.manudate !=null && x.manudate !=undefined)
   {
      x.manudatelabel=moment( x.manudate).format('YYYY.MM.DD');
      x.manudate=new Date(moment( x.manudate).format('YYYY-MM-DD'));
   }
   if(x.sampledate !=null&&x.sampledate !=undefined)
   {
     x.sampledatelabel=moment( x.sampledate).format('YYYY.MM.DD');
   }
   if(x.expireddate !=null&&x.expireddate !=undefined)
   {
    x.expireddate=new Date(moment( x.sampledate).format('YYYY-MM-DD'));
   }
 }
}

export interface AdditionalData
{
  projectid?:string;
  sampleid?:string;
  projectindex?:number;
  sampleindex?:number;
  sampleprice?:number;
  extern?:number;
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
  standardid?:number;
  testprojectid?:number;
  roleid?:string;
  userid?:string;
  methodid?:string;
  methodname?:string;
  testprojectindex?:number;
  testprojecrowspan?:number;
  qualificationid?:number;
  testcount?:number;
  price?:number;
  realprice?:number;
  reportcount?:number;
  domain?:string;
  beforeuserid?:string;
  beforeroleid?:string;
  beforequalificationid?:number;
}