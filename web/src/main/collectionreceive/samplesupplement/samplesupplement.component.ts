import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMessageService, XTableColumn } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject, CommonType } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service'; 
import { Contact, ContactService } from 'src/services/ContactService';
import { Sample, SampleService } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { UpdatesampleComponent } from './updatesample/updatesample.component';

@Component({
  selector: 'app-samplesupplement',
  templateUrl: './samplesupplement.component.html',
  styleUrls: ['./samplesupplement.component.scss']
})
export class SamplesupplementComponent extends PageBase implements OnInit { 
  constructor(
     public indexService:IndexService
    ,private flowservice:FlowService 
    ,private sampleservice:SampleService
    ,private contactservice:ContactService
    ,private actroute:ActivatedRoute 
    ,private router: Router
    ,private globalaudit:AuditResultService
    ,private msg:XMessageService
    
    ) {
    super(indexService);
    if(actroute !=undefined)
      {
         
        actroute.params.subscribe(
        (x:any)=>
          {
            
            this.contactid=x.contactid;
            this.taskid=x.taskid;
            this.getData();
          }
        );
      }
  }
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
  projectclick(sample:Sample)
  { 
    this.modifyvisible=true;
    
    this.modifisample.setSample(sample);
  }
  delegatecustomer:string="";
testcustomer:string="";
paycustomer:string="";
servicetype:string="";
ispanding:string="";
seal:string="";
samplesource: string='';
  @ViewChild("modifisample")modifisample:UpdatesampleComponent;
  modifyconfirm()
  { 
      this.projects.map(
        (x)=>
        {
          x.samples?.map(
            (z:any)=>
            {
              if(z.id==this.modifisample.curentsample.id)
              {
                 for(var m in z)
                 {
                   if(m !='id')
                   {
                     z[m]= (this.modifisample.curentsample as any)[m];
                   }
                 }
                 this.setsamplelabel(z);
              }
            }
          )
        }
      );
     this.sampledata=[...this.sampledata];
  }
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
      }
    }
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
  submit()
  {
    let samples:Sample[]=[];
    this.projects.map(
      (x)=>
      {
        x.samples?.map((z)=>samples.push(z))
      }
    );
    if(samples.length>0)
    {
    this.sampleservice.supplimentupdatesamples(samples).subscribe(
      (x)=>
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
          }
        );
      }
    );
  }
  }
  setsamplelabel(x:any)
  {
    x.storelabel=x.store?.label;
    x.testtypelabel=x.testtype?.label;
    x.statuslabel=x.status?.label;
    x.processlabel=x.process?.label;
  }
  sampledata:any[]=[];
  action(row:BusinessProject)
  {
     this.sampledata=[];
     row.samples?.map
     (
      (x:any)=>
      { 
        this.setsamplelabel(x);
        this.sampledata.push(x);
      }
     ) ;  
  }
  
  columns: XTableColumn[] = [ 
    { id: 'actions', label: '操作', width: 100 }, 
    { id: 'samplename', label: '名称', width: 150, sort: true }, 
    { id: 'storelabel', label: '保存条件', width: 150, sort: true }, 
    { id: 'testtypelabel', label: '监测类别', width: 150, sort: true } , 
    { id: 'processlabel', label: '处理方式', width: 150, sort: true } , 
    { id: 'statuslabel', label: '样品状态', width: 150, sort: true } , 
    { id: 'samplespec', label: '规格', width: 150, sort: true } , 
    { id: 'brand', label: '商标', width: 150, sort: true }, 
    { id: 'executestandard', label: '产品执行标准', width: 150, sort: true }, 
    { id: 'wrapherproperties', label: '样品包装及性状', width: 150, sort: true }, 
    { id: 'samplequality', label: '样品数量', width: 150, sort: true }, 
    { id: 'executegrade', label: '样品等级', width: 150, sort: true }            
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
