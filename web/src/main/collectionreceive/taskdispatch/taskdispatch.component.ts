import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  XMessageService, XTreeComponent, XTreeNode } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject, ContactProjectService } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { Qualification } from 'src/main/qualification/qualification.service';
import { ContactService, ContactTestProject } from 'src/services/ContactService';
import { Sample, SampleService } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { ModifytaskdispatchComponent } from './modifytaskdispatch/modifytaskdispatch.component';
import { DispatchRoleTaskService, RoleTestProject } from './taskdispatch.service';

@Component({
  selector: 'app-taskdispatch',
  templateUrl: './taskdispatch.component.html',
  styleUrls: ['./taskdispatch.component.scss']
})
export class TaskdispatchComponent extends PageBase implements OnInit {

  constructor( public indexService:IndexService
    ,private flowservice:FlowService 
    ,private service:DispatchRoleTaskService
    ,private sampleservice:SampleService
    ,private contactservice:ContactService
    ,private projectservice:ContactProjectService
    ,private actroute:ActivatedRoute 
    ,private router: Router
    ,private globalaudit:AuditResultService
    ,private msg:XMessageService
    ,private roleservice:DispatchRoleTaskService
    ) {
    super(indexService);
    if(actroute !=undefined)
      { 
        actroute.params.subscribe(
        (x:any)=>
          { 
            if(x.complete !=undefined)
            {
              this.disabled=true;
              this.getprojectdata(x.contactid);
            }
            else
            {
            this.contactid=x.contactid;
            this.taskid=x.taskid;
            this.getData();
            }
             
          }
        );
      }
  }
  datechange(item:any,ev:any)
  {
    var project=  this.projects.find((x)=>x.id==item.projectid);
    if(project !=null)
    {
      project.dispatchtime=ev;
    }
  }
  submit()
  { 
    this.projectservice.addcontactprojectinfos(this.projects)
    .subscribe(
      (x)=>
      {
        var param:any={};
       param.taskid=this.taskid;
       param.roles=[];
        this.data.map((y)=>
        {
          param.roles.push(y.roleid);
        }
        );
        this.flowservice.getassignees(param).subscribe
        (
          (y)=>
          {
             y.userid=this.indexService.auth.user.id;
             y.username=this.indexService.auth.user.name;
             y.contactid=this.currentcontact.id;
             this.flowservice.excutetask(this.taskid,
                    y).subscribe(
                      (z)=>
                      { 
                        this.msg.success("提交成功！");
                        this.disabled=true; 
                      }
                    );
          }
        ); 
      }
    );
    
  }
  
  disabled=false;
   taskid="";
  ngOnInit(): void {
  }
   
  currentcontact:any;
  projects:any[]=[];
  delegatecustomer:string="";
  testcustomer:string="";
  paycustomer:string="";
  servicetype:string="";
  ispanding:string="";
  seal:string="";
  samplesource: string='';
  samples:any[]=[];
  testproect:any[]=[];
  testprojecthidden='none';
  projecthidden='none';
  samplehidden='none';
  //点击不同点显示不同内容
  currentSample:Sample={};
  currentProject:BusinessProject={};
  currentTestProject:ContactTestProject={}; 
   getprojectdata(id:string)
   {
    this.contactservice.getcontactproject(id).subscribe(
      (x)=>
      {  
        this.currentcontact=x.contact; 
       this.projects=x.projects as any[];
       if(this.currentcontact !=null)
         { 
         if(this.currentcontact.contactcustomers !=null)
           {
             this.delegatecustomer='';
             this.testcustomer='';
             this.paycustomer='';
             var users=this.currentcontact.contactcustomers.filter((x:any)=>x.customertype==1);
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
             var customer=this.currentcontact.contactcustomers.find((x:any)=>x.customertype==2);
             this.paycustomer=customer?.customername+'';
             customer=this.currentcontact.contactcustomers.find((x:any)=>x.customertype==3);
              this.testcustomer= customer?.customername+'';
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
              this.roleservice.getroletaskdispatchs('').subscribe(
                (y)=>
                {
                  this.roles=y;
                }
              ); 
               this.data=ProjectUtil.getMareData(this.projects,this.ispanding,true);
                
      }
    }
     
  } 
    );
   }
  getData()
  {
 
   this.service.getroletaskdispatchs(this.contactid).subscribe(
     (p)=>
     {
      
       this.getprojectdata(this.contactid);
  }
    );
    
  }
  editvisible=false;
  @ViewChild("modifytask")modifytask:ModifytaskdispatchComponent;
  currentrow:any;
  projectclick(item:any)
  {
    if(item !=undefined)
    {
      this.currentrow=item;
      this.editvisible=true; 
      this.modifytask.gettableallData(item.testprojectid,item.standardid);
    }
  }
   rolename='';
  modifyquali:any[]=[]; 
  SaveModify(item:Qualification)
  {
    if(item !=undefined)
    {
      if(item.qualificationid !=this.currentrow.qualificationid)
      {
       var ffindex= this.modifyquali.findIndex((x)=>x==this.currentrow.sampleid);
       if(ffindex==-1)
       {
        this.modifyquali.push( this.currentrow.sampleid );
                              this.currentrow.qualificationid=item.qualificationid;
       }
      }
      this.data.map(
        (x)=>
        {
          if(x.qualificationid==item.qualificationid)
          {
            x.testprojectid=item.testprojectid;
            x.testproject=item.testproject;
            x.standardid=item.standardid;
            x.methodname=item.methodname;
            x.methodid=item.methodid;
             
            x.roleid=item.roleid;
            x.userid=item.userid;
          }
        }
      )
      
    }
    this.editvisible=false;
  }
  roles:RoleTestProject[]=[];
  data:any[]=[]; 
 
   contactid="";
   rowchange(item:any)
  {
    if(item !=undefined)
    {
      var ffindex=this.roles.findIndex((x)=>x.id==item);
      if(ffindex !=-1)
         return this.roles[ffindex].label;
    }
    return "";
  }
}

 