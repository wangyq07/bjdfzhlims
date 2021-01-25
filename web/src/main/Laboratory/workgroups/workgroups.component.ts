import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMessageService } from '@ng-nest/ui';
import * as moment from 'moment';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject, ContactProjectService } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { DispatchRoleTaskService, RoleTestProject } from 'src/main/collectionreceive/taskdispatch/taskdispatch.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { ContactService, ContactTestProject } from 'src/services/ContactService';
import { Sample, SampleService } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.scss']
})
export class WorkgroupsComponent extends PageBase implements OnInit {

  constructor( public indexService:IndexService
    ,private flowservice:FlowService  
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
            this.getprojectdata(x.contactid);
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
            var param:any={};
            param.userid=this.indexService.auth.user.id;
            param.username=this.indexService.auth.user.name;
            param.contactid=this.currentcontact.id;
             this.flowservice.excutetask(this.taskid,
              param).subscribe(
                      (z)=>
                      { 
                        this.msg.success("提交成功！");
                        this.disabled=true; 
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
  data:any[]=[];
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
        console.log(x);
       //this.projects=x.projects as any[];
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
              var currentroles=this.indexService.auth.user.roles;
              x.projects.map(
                (p:BusinessProject)=>
                {
                  var tempproject=ProjectUtil.deepClone(p);
                  tempproject.samples=[];
                  p.samples?.map(
                    (s:Sample)=>
                    {
                      var tempsample=ProjectUtil.deepClone(s);
                      tempsample.testprojects=[];
                      s.testprojects?.map
                      (
                        (tp:ContactTestProject)=>
                        {
                            if(currentroles.findIndex((ind)=>ind.id==tp.roleid) !=-1)
                            {
                              tempsample.testprojects.push(tp);
                            }
                        }
                      );
                      if(tempsample.testprojects.length>0)
                      tempproject.samples.push(tempsample);
                    }
                  );
                  if(tempproject.samples.length>0)
                  {
                    this.projects.push(tempproject);
                  }
                }
              );
              if(this.projects.length>0)
               this.data=ProjectUtil.getMareData(this.projects,this.ispanding,true);
                
      }
    }
     
  } 
    );
   }
   roles:RoleTestProject[]=[];
  editvisible=false; 
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
   getdate(date:Date)
   {
    return moment(date).format('YYYY.MM.DD');
   }
}
