 
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMessageService, XQuery, XSort, XTableColumn, XTableComponent } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { FlowService, Task } from 'src/main/flow/flowprocess/flowhandle.service'; 
import { Qualification } from 'src/main/qualification/qualification.service';
import { RoleAuditSettingService } from 'src/main/system/roleauditset/roleautidtset-service';
import { Contact, ContactService, ContactTestProject } from 'src/services/ContactService';
import { Sample } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ModifyqualificationComponent } from './modifyqualification/modifyqualification.component';

@Component({
  selector: 'app-ctoaudit',
  templateUrl: './ctoaudit.component.html',
  styleUrls: ['./ctoaudit.component.scss']
})
export class CtoauditComponent extends PageBase implements OnInit,AfterViewInit {
  index=1;
  size=10000;
  total=0;
  query: XQuery = {};
  data:Task[];
  
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, type: 'index' }, 
    { id: 'name', label: '任务', width: 100, sort: true }, 
    { id: 'customername', label: '客户', width: 150, sort: true },
    {id:'preuser',label:'前置处理人', width: 200, sort: true},
    {id:'createtime',label:'创建日期', width: 200, sort: true},
    { id: 'from', label: '上一节点', width: 100, sort: true }
  ];
  taskid="";
  acction(audit:number)
  {
    this.roleauditservice.getauditvariable(this.indexService.auth.user.roles,audit,this.auditaddvice).subscribe
    (
      (x)=>
      {
        if(this.tablecom.activatedRow!=null)
        {
          var selectrow=this.tablecom.activatedRow as Task;
          if(selectrow !=undefined)
          {
          x.username=this.indexService.auth.user.name;
          x.userid=this.indexService.auth.user.id;
          x.contactid=selectrow.contactid; 
          x.qupricediscount=this.CurrentContact.discount;
          x.customername=selectrow.customername; 
          x.standardfee=this.CurrentContact.standardfee;
          x.roles=this.indexService.auth.user.roles; 
          this.flowservice.excutetask(selectrow.taskid+'',x).subscribe
          (
            (x)=>
            { 
             
              if(this.modifysample.length>0)
              {
                this.contactservice.updatecontacttest({samples:this.modifysample}).subscribe(
                  (d:any)=>
                  {
                     this.msg.success("提交成功");
                     this.getData();
                     this.globalaudit.sendAuditResult("成功");
                  }
                );
              }
            }
          );
         }
        }
      }
    );
  }
  modifyvisible=false;
  currentitem:ContactTestProject;
  currentsample:Sample;
  @ViewChild("modifiqual")modifiqual:ModifyqualificationComponent
  projectclick(item:ContactTestProject,sample:Sample)
  {
    this.modifyvisible=true;
    this.currentitem=item;
    this.currentsample=sample;
    this.modifiqual.limitmax=Number(item.limitmax);
    this.modifiqual.limitmin=Number(item.limitmin);
    this.modifiqual.search({name:item.testproject,id:item.qualificationid}); 
  }
  modifysample:any[]=[];
  modifyconfirm()
  {
    if(this.modifiqual.limitmax!=this.currentitem.limitmax
       ||this.modifiqual.limitmin !=this.currentitem.limitmin
      )
      {
        this.currentitem.limitmax=this.modifiqual.limitmax;
        this.currentitem.limitmin=this.modifiqual.limitmin;
        var findex=this.modifysample.findIndex((x)=>x.id==this.currentsample.id);
        if(findex==-1)
        this.modifysample.push(this.currentsample);
      }
    if(this.modifiqual.tablecom.activatedRow!=undefined
      &&this.currentitem.qualificationid!=this.modifiqual.tablecom.activatedRow.id)
    {
       var selqualification=this.modifiqual.tablecom.activatedRow as Qualification;
        this.currentitem.qualificationid=selqualification.id+'';
        this.currentitem.testproject=selqualification.testproject;
        this.currentitem.methodname=selqualification.methodname;  
        var findex=this.modifysample.findIndex((x)=>x.id==this.currentsample.id);
        if(findex==-1)
        this.modifysample.push(this.currentsample);
      
    }
  }
  constructor(public indexService: IndexService, 
    private flowservice:FlowService,
    private roleauditservice:RoleAuditSettingService,
    private contactservice:ContactService,
    private actroute:ActivatedRoute ,
    private router: Router
    ,private globalaudit:AuditResultService
    ,private msg:XMessageService
    ) { 
      super(indexService); 
      if(actroute==undefined)
      {
        this.getData();
      }
      else
      {
        actroute.params.subscribe(
        (x:any)=>
          {
            this.taskid=x.taskid;
            this.getData();
          }
        );
      }
       console.log(indexService);
       for(var i=0;i<  indexService.auth.user.organizations.length;i++)
       {
         if(indexService.auth.user.organizations[i].checkprice==1)
         {
          this.showprice = true;
          this.showtablecel = "table-cell";
          break;
         }
       }
    }
  ngAfterViewInit(): void { 
  }
delegatecustomer:string="";
testcustomer:string="";
paycustomer:string="";
servicetype:string="";
ispanding:string="";
seal:string="";
reportcount:number=2;
samplesource: string='';
businessfee:number=0.0;
collectionfee:number=0.0;
testfee:number=0;
standfee:number=0;
externfee:number=0;
discount:number=0;
totalfee:number=0;
showprice=false;//"inline";
showtablecel:string="none";//"table-cell";
  
  auditaddvice='';
  projects:any[]=[];
  ngOnInit(): void {
    
  }
  getroundvalue(testfee:number,standfee:number)
  {
    var discount=Math.round(testfee/standfee*100)/100;
    if(this.CurrentContact!=undefined)
    {
      this.CurrentContact.standardfee=standfee;
      this.CurrentContact.discount=discount;
    }
    return discount;
  }
  setclear()
  {
    this.projects=[];
    this.servicetype="";
    this.seal='';
    this.samplesource='';
    this.delegatecustomer='';
    this.paycustomer='';
    this.testcustomer='';
    this.standfee=0;
    this.totalfee=0;
    this.testfee=0;
    this.discount=0;
    this.externfee=0;
    this.businessfee=0;
  }
  setproject(tsk:Task)
  {
    
     this.contactservice.getcontactproject(tsk.contactid+'').subscribe(
       (x)=>
       { 
         console.log(x);
        this.CurrentContact=x.contact;  
        this.projects=x.projects as any[];
         if(this.CurrentContact !=null)
         { 
         if(this.CurrentContact.contactcustomers !=null)
           {
             this.delegatecustomer='';
             this.testcustomer='';
             this.paycustomer='';
             var users=this.CurrentContact.contactcustomers.filter((x)=>x.customertype==1);
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
             var user=this.CurrentContact.contactcustomers.find((x)=>x.customertype==2);
             this.paycustomer=user?.customername+'';
                user=this.CurrentContact.contactcustomers.find((x)=>x.customertype==3);
              this.testcustomer= user?.customername+'';
              this.servicetype="";
               this.servicetype=this.CurrentContact.service?.label+'';
               this.ispanding=this.CurrentContact.isjudgement==1?'是':'否'; 
               this.seal='';//
               if(this.CurrentContact.seal!=undefined)
               {
               for(var i=0;i<this.CurrentContact.seal.length;i++)
               this.seal= this.seal+this.CurrentContact.seal[i].label+',';
             }
              this.samplesource=this.CurrentContact.samplesource?.label+'';
              this.businessfee=Number(this.CurrentContact.businessfee);
               this.collectionfee=Number(this.CurrentContact.collectionfee); 
               this.testfee=Number(this.CurrentContact.testfee); 
               this.standfee = Number(this.CurrentContact.standardfee);  
               this.discount=Number(this.CurrentContact.discount);
               this.totalfee= Number(this.CurrentContact.totalfee);
               this.externfee=Number(this.CurrentContact.externfee);
           }
         }
       }
     );
   
    
    }
     
   
 
  CurrentContact:Contact={};
  activatedRow(row:Task)
  {
    this.modifysample =[];
    this.setproject(row);
  }
  @ViewChild("tablecom")tablecom:XTableComponent;
  getData() {
    this.setclear();
    if(this.indexService.auth.user.roles!=undefined )
    { 
    this.flowservice.getTaskListByRoleId(this.indexService.auth.user.roles).subscribe((x)=>
    { 
      [this.data, this.total] = [(x.list as Task[]).filter((p)=>p.taskdefinid=='task_ctoaudit'), x.list.length];
        if(this.taskid!=undefined&&this.taskid!='')
        {
            var findex=this.data.findIndex((x)=>x.taskid==this.taskid);
            if(findex!=-1)
            {
              this.tablecom.activatedRow=   this.data[findex];
              this.setproject(this.data[findex]);
            }
            else if(this.data.length>0)
            {
              this.tablecom.activatedRow=   this.data[0];
              this.setproject(this.data[0]);
            }
        }
        else if(this.data.length>0)
        {
         this.tablecom.activatedRow=   this.data[0];
         this.setproject(this.data[0]);
        }
    }
    );
  }
  }
  
  indexChange(index: number) {
    this.index = index;
    this.modifysample =[];
    this.getData();
  }
  
  sortChange(sort: XSort[]) {
    this.query.sort = sort; 
    this.modifysample =[];
    this.getData();
  }
}
