import { Component, OnInit, Output,EventEmitter, ViewChild, Input } from '@angular/core';
import { XInputComponent, XMessageService } from '@ng-nest/ui';
import { Customer } from 'src/services/CustomerService'; 
import { SampleDomainService } from 'src/main/qualification/qualification.service';
import { ProjectUtil } from 'src/share/utilclass';
 
import { CustomerComponent } from '../../customer/customer.component';
import { SampleComponent } from '../../sample/sample.component';
import { BusinessProject, CommonType, ContactProjectService, RecieveSampleFormService, SealService, ServiceType, ServiceTypesService } from '../businessproject.service'; 
import { Contact } from 'src/services/ContactService'; 
@Component({
  selector: 'app-addbusinessproject',
  templateUrl: './addbusinessproject.component.html',
  styleUrls: ['./addbusinessproject.component.scss']
})
export class AddbusinessprojectComponent implements OnInit {

  constructor(private receiveservice:RecieveSampleFormService 
    ,private sealService:SealService
    ,private service:ContactProjectService
    ,private projectservicetype:ServiceTypesService
    ,private domainservice:SampleDomainService
    ,private Msg:XMessageService
    ) { }
  @Output() private projectchange=new EventEmitter<BusinessProject[]>();
  process:CommonType[]=[];
  processid=1;
  ngOnInit(): void {
    this.receiveservice.getList(1,20,{}).subscribe(
      (x)=>
      {
        this.samplesourcedata=x.list as CommonType[]; 
      }
    ); 
    
    this.sealService.getList(1,20,{}).subscribe(
      (x:any)=>
      {
        this.sealdata=x.list as CommonType[];
      }  
    );
     this.projectservicetype.getList(1,20,{}).subscribe(
      (x)=>
      {
        this.servicetypedata=x.list as ServiceType[]; 
      }
     );
     this.domainservice.getList(1,20,{}).subscribe(
      (x)=>
      {
        this.domaindata=x.list as CommonType[]; 
      }
    );
    this.sealService.getsampleprocess().subscribe(
      (x:any)=>
      {
        this.process=x.list as CommonType[];
      }
    );
      setTimeout(()=>{this.showTableBoolean=true},0); 
  }
  getprocessmodel(processid:any)
  {
    if(processid==null||processid==undefined)
    {
      return 2;
    }
    return processid;
  }
  type:string;
  @Input() currentproject:BusinessProject; 
  currentprojectcount:number=0;
  setinit(projectcount:number)
  { 
   
   this.currentprojectcount=projectcount;
       if(this.currentproject.samples !=undefined)
       {
        this.sampledata.type=this.type; 
        this.sampledata.currentproject=this.currentproject; 
         
           this.sampledata.setsampledata(this.currentproject.samples); 
       }
           this.delegates=[];
           this.pays=[];
           this.inspects=[];
      if(this.currentcontact !=undefined)
      {   
      if(this.currentcontact.contactcustomers !=undefined&&this.currentcontact.contactcustomers.length!=0)
      {
        this.currentcontact.contactcustomers.map(
          (x)=>
          { 
            if(x.customertype==1)
            this.delegates.push({id:x.customerid+'', customername:x.customername});
            if(x.customertype==2)
            this.pays.push({id:x.customerid+'', customername:x.customername});
            if(x.customertype==3)
            this.inspects.push({id:x.customerid+'', customername:x.customername});
          }
        );

      }
      if(this.currentcontact.seal !=undefined)
      {
        this.seal=[];
        for(var i=0;i<this.currentcontact.seal.length;i++)
        {
          this.seal.push(Number(this.currentcontact.seal[i].id));
        }
      }  
      if(this.currentcontact.service !=undefined)
      {
        this.servicetype=Number(this.currentcontact.service.id);
      } 
      if(this.currentcontact.samplesource !=undefined)
      { 
        this.samplesource=Number(this.currentcontact.samplesource.id);
      } 
    }

       
       
  }
  currentcontactdisabled=false;
  set contactdisabled(value:boolean)
  {
    this.currentcontactdisabled=value;
  }
  get contactdisabled()
  {
     return this.currentcontactdisabled;
  }
  multiplereportdata=[{id:0,label:'合出报告'},{id:1,label:'分出报告'}];
  multiplereport=0;
  judgedata=[{id:1,label:'是'},{id:0,label:'否'}]; 
  externdata=[{id:1,label:'是'},{id:0,label:'否'}]; 
  domaindata:CommonType[]=[]; 
  domain=1;
  sealdata:CommonType[]=[]; 
  seal:any[]=[];
  ugencyservice=false;
  standardservice=true;
  customertype:string='';
  delegates:Customer[]=[];
  inspects:Customer[]=[];
  pays:Customer[]=[];
  servicetypedata:ServiceType[];
  servicetype=1;
  selvisible=false;
  customeradaption=240;
  @ViewChild("selcustomer")selcustomer:CustomerComponent;
  @ViewChild("inspectcustomer")inspectcustomer:CustomerComponent;
  @ViewChild("paycustomer")paycustomer:CustomerComponent;
  @ViewChild("sampledata")sampledata:SampleComponent;
  hidebutton='none';
  selconfirm()
  { 
    switch(this.customertype)
    {
      case 'delegate':
        this.delegates=this.selcustomer.seldata; 
        
        break;
        case 'pay':
          this.pays=[this.paycustomer.customtable.activatedRow as Customer]; 
          break;
          case 'inspect':
            this.inspects=[this.inspectcustomer.customtable.activatedRow as Customer];
            break;

   }
  }
  tagclose(cus:Customer,type:string)
  {
    switch(type)
    {
      case 'delegate':
        this.deletetag(this.delegates,cus.id+'');
        break;
        case 'pay':
          this.deletetag(this.pays,cus.id+'');
          break;
          case 'inspect':
            this.deletetag(this.inspects,cus.id+'');
            break;

   }
    
  }
  deletetag(tagdata:Customer[],id:string)
  {
    var index= tagdata.findIndex((x)=>x.id==id);
    if(index !=-1)
    {
      tagdata.splice(index,1);
    }
  }
  invalidinfo='';
  showTableBoolean=false;
  @ViewChild('invalidcollectionfee')invalidcollectionfee:XInputComponent;
  @ViewChild('invalidbusinessfee')invalidbusinessfee:XInputComponent;
  @ViewChild('invalidreportcount')invalidreportcount:XInputComponent;
  @ViewChild('invalidexternfee')invalidexternfee:XInputComponent;
  get formInvalid()
  {
    var reg=/^[0-9]{1,10}$/; 
    this.invalidinfo="";  
      if(this.delegates!=undefined&&this.delegates.length==0)
      {
        this.invalidinfo="客户不能为空";
        return true;
      }
     
      if(this.invalidcollectionfee !=undefined&&this.invalidcollectionfee.value !=undefined&&isNaN(this.invalidcollectionfee.value))
      {
        this.invalidinfo="采样费不是数字";
        return true;
      }
      if(this.invalidbusinessfee !=undefined&&this.invalidbusinessfee.value !=undefined&&isNaN(this.invalidbusinessfee.value))
      {
        this.invalidinfo="业务费不是数字";
        return true;
      }
      if(this.invalidreportcount !=undefined&&this.invalidreportcount.value !=undefined&&!reg.test(this.invalidreportcount.value))
      {
        this.invalidinfo="报告份数不是数字";
        return true;
      }
      if(this.invalidexternfee !=undefined&&this.invalidexternfee.value !=undefined&&isNaN(this.invalidexternfee.value))
      {
        this.invalidinfo="外包费不是数字";
        return true;
      }
      if(this.sampledata!=undefined&&this.sampledata?.sampledata!=undefined&&this.sampledata?.sampledata?.length==0)
      {
        this.invalidinfo="样品不能为空";
        return true;
      }
    return false;
  }
  get disabled()
  { 
    return this.type=="info";
  }
  currentcontact:Contact={};
  setproject()
  {
    if(!this.contactdisabled)
    {
    /** 设置合同相关值 */
    if(this.currentcontact !=undefined)
    {
    if(this.currentcontact.contactcustomers !=undefined)
    {
      this.currentcontact.contactcustomers=[];
    this.delegates.map((x)=>
    {
      if(this.currentcontact.contactcustomers !=undefined)
      this.currentcontact.contactcustomers.push({contactid:this.currentcontact.id+'',customerid:x.id,customername:x.customername,customertype:1});
    }
    );
     if(this.pays.length>0)
     this.currentcontact.contactcustomers.push({contactid:this.currentcontact.id+'',customerid:this.pays[0].id,customername:this.pays[0].customername,customertype:2});
    if(this.inspects.length>0)
    this.currentcontact.contactcustomers.push({contactid:this.currentcontact.id+'',customerid:this.inspects[0].id,customername:this.inspects[0].customername,customertype:3});
   } 
   this.currentcontact.samplesource=this.getpr(this.samplesource+'',this.samplesourcedata);
   this.currentcontact.seal=[];
      
      for(var i=0;i<this.seal.length;i++)
       {
           console.log(this.currentcontact.seal?.findIndex((x)=>x.id==this.seal[i].id));
         if(this.currentcontact.seal?.findIndex((x)=>x.id==this.seal[i].id) ==-1)
        this.currentcontact.seal?.push(this.getpr(this.seal[i]+'',this.sealdata));
       }
    this.currentcontact.service=this.getpr(this.servicetype+'',this.servicetypedata); 
  }
}
  /**设置项目相关值 */
    if(this.currentproject !=undefined)
    { 
     
   if(this.sampledata.sampledata.length>0) 
   { 
    this.currentproject.domain=this.getpr(this.sampledata.sampledata[0].domainid+'',this.domaindata);  
   this.currentproject.samples=this.sampledata.sampledata;
  }
  } 
  }
  getpr(sid:string,data:CommonType[]):CommonType
  {
    var object=data.find((x)=>x.id==sid);
    if(object !=undefined)
    return object;
     return {};
  }
  setmultiproject(tprojects:BusinessProject[])
  { 
    if(this.currentproject.mergereport==1)
    {
      if(this.currentproject.samples !=undefined)
      {
      for(var i=0;i<this.currentproject.samples.length;i++)
      {
          var project:any={};
           for(var attr in this.currentproject)
           {
             project[attr]=(this.currentproject as any)[attr];
           }
           //project.projectstatus=0;
           project.samples=[];
           project.id=ProjectUtil.JsNewGuid();
           var sample:any={};
           for(var attr in this.currentproject.samples[i])
           {
             sample[attr]=(this.currentproject.samples[i] as any)[attr];
           } 
           sample.projectid=project.id; 
           project.samples.push(sample);
           var domainobject=this.domaindata.find((x)=>x.id==sample.domainid);
           if(domainobject !=undefined)
           project.domain=domainobject;
           project.projectnumber=project.projectnumber+''+(this.currentprojectcount+i+1);  
           tprojects.push(project);
      }
     }
      
    }
    else
    {
      if(this.currentproject.projectstatus ==0)
      this.currentproject.projectnumber='临时项目'+(this.currentprojectcount+1);  
      //this.currentproject.projectstatus=0; 
     tprojects.push(this.currentproject);
    }
  }
  action(type:string)
  {
     switch(type)
     {
      case 'save':
         this.setproject();
         var tprojects:BusinessProject[]=[];
         this.setmultiproject(tprojects);

         if(this.type=='add')
         { 
         this.service.post({id:ProjectUtil.JsNewGuid(),projects:tprojects}).subscribe(
           (x)=>
           { 
             this.projectchange.emit(x.projects);
             this.Msg.success("添加成功");
            }
         ); 
        }
        else if(this.type=='edit')
        {
          if(tprojects.length==1)
          { 
            this.service.put({id:ProjectUtil.JsNewGuid(),projects:tprojects}).subscribe(
              (x)=>
              { 
                this.projectchange.emit(x.projects);
                this.Msg.success("修改成功");
               }
            ); 
          }
          else
          {
            this.service.delete(this.currentproject.id+'').subscribe(
              (x)=>
              { 
                this.service.post({id:ProjectUtil.JsNewGuid(),projects:tprojects}).subscribe(
                  (y)=>
                  { 
                    this.projectchange.emit(y.projects);
                   }
                ); 
               }
            ); 
          }
        }  
         break;
      case 'cancel':
        this.projectchange.emit(undefined);
     }
  } 
  disablecls="x-radio x-flex x-justify-start x-align-start x-direction-column";
  samplesourcedata:CommonType[]=[]; 
  samplesource=1; 
  payvisible=false;
  inspectvisible=false;
  inspectfunctiontype=3;
  payfunctiontype=2;
  addcustomer(type:string)
  { 
    this.customertype=type;
    switch(type)
    {
      case 'delegate':
        this.selvisible=true; 
        this.selcustomer.seldata=this.delegates;
        this.selcustomer.setselect();
        break;
        case 'pay':
          this.payvisible=true;
          this.paycustomer.seldata=this.pays;
          this.paycustomer.setselect(false);
          break;
          case 'inspect':
            this.inspectvisible=true;
            this.inspectcustomer.seldata= this.inspects;
            this.inspectcustomer.setselect(false);
            break; 
   }
  }
}
