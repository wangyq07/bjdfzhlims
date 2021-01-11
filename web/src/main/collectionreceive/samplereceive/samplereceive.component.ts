import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMessageService, XTableColumn, XTableComponent } from '@ng-nest/ui';
import * as moment from 'moment';
import * as printJS from 'print-js';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject, CommonType, ContactCustomer, SealService } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { OutputadditionallistComponent } from 'src/main/businessprocess/outputadditionallist/outputadditionallist.component';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { RegisterfoodsampleComponent } from 'src/main/outputtemplete/registersample/registerfoodsample/registerfoodsample.component';
import { SampleDomainService } from 'src/main/qualification/qualification.service';
import { Contact, ContactService } from 'src/services/ContactService';
import { Sample, SampleService } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-samplereceive',
  templateUrl: './samplereceive.component.html',
  styleUrls: ['./samplereceive.component.scss']
})
export class SamplereceiveComponent extends PageBase implements OnInit {
  process:CommonType[]=[];
  constructor(
    public indexService:IndexService
   ,private flowservice:FlowService 
   ,private sampleservice:SampleService
   ,private contactservice:ContactService
   ,private actroute:ActivatedRoute 
   ,private router: Router
   ,private domainservice:SampleDomainService
   ,private sealService:SealService
   ,private globalaudit:AuditResultService
   ,private msg:XMessageService
   
   ) {
   super(indexService);
   if(actroute !=undefined)
     {
        
       actroute.params.subscribe(
       (x:any)=>
         {
           if(x.complete!=undefined)
            this.disabled=true;
           this.contactid=x.contactid;
           this.taskid=x.taskid;
           this.getData();
           this.sealService.getsampleprocess().subscribe(
             (x)=>this.process=x.list as CommonType[]
           );
         }
       );
     }
 }
 domaindata:CommonType[]=[];
 modifyvisible=false;
 taskid='';
 gettypelable(type:string,sample:any,other:string)
 {
   if(sample !=undefined&&sample[type] !=undefined&&sample[type].id !=null)
   {
    if(sample[type].id==999)
    {
       
     return sample[other];
    }
    return sample[type].label;
   }
   return "";
 }

 delegatecustomer:string="";
testcustomer:string="";
paycustomer:string="";
servicetype:string="";
ispanding:string="";
seal:string="";
samplesource: string=''; 
 projects:BusinessProject[]=[];
 currentcontact:Contact={};
 getData()
 {
   this.contactservice.getcontactproject(this.contactid+'').subscribe(
     (x)=>
     {  
       this.currentcontact=x.contact as Contact;
      this.projects=x.projects as any[];
      if(this.currentcontact !=null)
        { 
        if(this.currentcontact.contactcustomers !=null)
          {
            this.delegatecustomer='';
            this.testcustomer='';
            this.paycustomer='';
            var users=this.currentcontact.contactcustomers.filter((x)=>x.customertype==1);
             if(users.length>0)
             {
                for(var i=0;i<users.length;i++)
                {
                  if(i !=0)
                  {
                    this.delegatecustomer =this.delegatecustomer+',';
                  }
                  this.delegatecustomer=this.delegatecustomer+users[i].customername;
                }
             }
            var user=this.currentcontact.contactcustomers.find((x)=>x.customertype==2);
            this.paycustomer=user?.customername+'';
               user=this.currentcontact.contactcustomers.find((x)=>x.customertype==3);
             this.testcustomer= user?.customername+'';
             this.servicetype="";
              this.servicetype=this.currentcontact.service?.label+'';
              this.ispanding=this.currentcontact.isjudgement==1?'是':'否'; 
              this.seal='';//
              if(this.currentcontact.seal!=undefined)
              {
              for(var i=0;i<this.currentcontact.seal.length;i++)
              this.seal= this.seal+this.currentcontact.seal[i].label+',';
              }
            this.samplesource=this.currentcontact.samplesource?.label+'';
             this.domainservice.getList(1,20,{}).subscribe(
               (x)=> this.domaindata=x.list as CommonType[]
             );
     }
   }
    //this.printtable.setdata(this.projects,this.ispanding);
    
   var allprojects:any={id:ProjectUtil.JsNewGuid(),type:0,label:'所有项目',reportcount:0,domainlabel:'',pid:null,samples:[]};
   this.projects.map((z:any)=>
          {
            z.label=z.projectnumber;
            z.pid=allprojects.id;
            z.domainlabel=z.domain.label;
            allprojects.reportcount=allprojects.reportcount+z.reportcount;
            allprojects.domainlabel=allprojects.domainlabel+''+z.domain.label+',';
            z.samples.map((q:any)=>{allprojects.samples.push(q)});
            z.type=1;
          }
       );
       this.projects.push(allprojects);
 }
   );
 }
  contactid="";
 ngOnInit(): void {
 }
 disabled=false;
 submit()
 {
      
       this.flowservice.excutetask(
         this.taskid,
         {
           iscollection:this.currentcontact.samplesource?.id==1?0:1,
           userid:this.indexService.auth.user.id+''
           ,username:this.indexService.auth.user.name 
           ,contactid:this.currentcontact.id 
         }
       ).subscribe(
         (z)=>
         {
           this.msg.success("提交成功！");
           this.disabled=true;
         }
       ); 
 } 
 
 @ViewChild("printtable")printtable:RegisterfoodsampleComponent;
 save(isprint:boolean)
 {
   let samples:Sample[]=[];
   var projectss:any[]=[];
   this.projects.map(
     (x:any)=>
     {
       if(x.type !=0)
       {
         projectss.push(x);
      //样品进行编号
      
      x.samples?.map((z:any)=>
         { 
          samples.push(z); 
         }
       );
     }
   }
   );
   if(samples.length>0)
   {
   this.sampleservice.supplimentupdatesamples(samples).subscribe(
     (x)=>
     { 
       if(isprint)
       {
       this.printtable.setsampledata(samples,this.pagesize); 
       setTimeout(() => {
         printJS({ printable: 'printtable', type: 'html',maxWidth:'98%',targetStyles:['*'],style:'@media print{@page {size:landscape}}'});
       }, 20);
     }
      
     }
     );
   }
 }

 @ViewChild('samplelist')samplelist:XTableComponent;
 copydata()
 {
   
   if(this.samplelist.activatedRow!=null&&this.samplelist.activatedRow!=undefined)
   {
     var tempsamle:any={};
  
   this.sampledata.map(
          (y)=>
          { 
            //拷贝特定字段，不能使用copy
            y.samplequality=this.samplelist.activatedRow?.samplequality;
            y.executegrade=this.samplelist.activatedRow?.executegrade;
            y.specialcondition=this.samplelist.activatedRow?.specialcondition;  
            y.wrapherproperties=this.samplelist.activatedRow?.wrapherproperties
            y.manudate=this.samplelist.activatedRow?.manudate;
            y.deleverdate= this.samplelist.activatedRow?.deleverdate;
            y.samplespec=this.samplelist.activatedRow?.samplespec
            y.brand=this.samplelist.activatedRow?.brand;
            y.executestandard=this.samplelist.activatedRow?.executestandard;
            y.status=this.samplelist.activatedRow?.status;
            //y.process=this.samplelist.activatedRow?.process;
            ProjectUtil.setsamplelabel(y,this.currentcontact,this.process);
             
          }
        );
         
       this.sampledata=[...this.sampledata];
   }
 }
 sampledata:any[]=[];
 pagesize=10;
 action(row:BusinessProject)
 {
  this.sampledata=[];
    row.samples?.map
    (
     (x:any)=>
     { 
      ProjectUtil.setsamplelabel(x,this.currentcontact,this.process); 
       this.sampledata.push(x);
     }
    );
    console.log(this.sampledata);   
 }
 genu()
 { 
    /*var a=[1,2,3,2,3,2,1,3];
    alert(a.filter(x=>x==3));*/
   this.save(true);
 }
 columns: XTableColumn[] = [  
   {id:'actions',width:80,sort:true},
   { id: 'sampledatelabel', label: '样品接收日期', width: 150, sort: true },
   { id: 'samplename', label: '样品名称', width: 150, sort: true }, 
   { id: 'samplenumber', label: '样品编号', width: 150, sort: true }, 
   { id: 'brand', label: '商标', width: 150, sort: true }, 
   { id: 'samplespec', label: '净含量/规格', width: 150, sort: true } ,
   {id:'manuuser',label:'生产单位',width:150},
   {id:'manuaddr',label:'生产单位地址',width:150},
   { id: 'samplequality', label: '样品数量', width: 150, sort: true }, 
   { id: 'manudatelabel', label: '生产日期', width: 150, sort: true } , 
   { id: 'executestandard', label: '执行标准', width: 150, sort: true },
   { id: 'executegrade', label: '样品等级', width: 150, sort: true },  
   { id: 'editexpired', label: '保质期', width: 150, sort: true }, 
   { id: 'wrapherproperties', label: '样品包装及性状', width: 150, sort: true }, 
   { id: 'statuslabel', label: '样品状态', width: 150, sort: true } ,   
   { id: 'editleftsample', label: '留样数量', width: 150, sort: true },   
   { id: 'editexpireddate', label: '到期日期', width: 150, sort: true } ,   
   { id: 'processlabel', label: '样品处置', width: 150, sort: true }            
 ];
 index=0;
 size=200;
 total=0;
 query={};
 activechange(item?:any)
 {

 }
 IndexChange(item?:any)
 {

 }

}
