import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  XMessageService, XTreeComponent, XTreeNode } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { ContactService, ContactTestProject } from 'src/services/ContactService';
import { Sample, SampleService } from 'src/services/sample.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
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
            this.contactid=x.contactid;
            this.taskid=x.taskid;
            this.getData();
             
          }
        );
      }
  }
  submit()
  {
   this.service.addRoleTaskDispatch(this.contactid,this.treeData).subscribe(
     (x)=>
     {
       this.msg.success("分配成功");
     }
   );
  }
  
   taskid="";
  ngOnInit(): void {
  }
  treeLoading = true;
  treeData =[];
  currentRoletest:RoleTestProject={};
  action( item: RoleTestProject) {
    console.log(item); 
    this.currentRoletest=item;
    this.projecttreeCom.setCheckedKeys(); 
    var keys:string[]=[];
     item.taskdispatchs?.map(
      (x:any)=>
        {
          keys.push(x.testid);
        }
    ); 
    this.projecttreeCom.setCheckedKeys(keys);  
    this.projecttreeCom.nodes.map(
      (x)=>
      {
        this.recursionNodeDisable(x,item);
      }
    );
     
  }
  currentkeys:string[]=[];
  recursionNodeDisable(node:TaskDispatch,item: RoleTestProject)
  {
    if(item==undefined)
    return;
    if(node.level==2)
    {
     var findex= this.currentkeys.findIndex((x)=>x==node.id);
     var ffindex=item.taskdispatchs?.findIndex((x)=>x.testid==node.id); 
     this.projecttreeCom.updateNode(node,{id:node.id,pid:node.pid,label:node.label,disabled:false});
     if(findex !=undefined&&findex !=-1&&ffindex==-1)
     {
      console.log(ffindex);console.log(findex);
        
        this.projecttreeCom.updateNode(node,{id:node.id,pid:node.pid,label:node.label,disabled:true});
     }
    }
    else if(node.level !=2)
    {
       node.children?.map(
         (x)=>
         {
          this.recursionNodeDisable(x,item);
         }
       );
    }
  }
  taskTreeData:TaskDispatch[]=[];
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
  checkaction(row:TaskDispatch)
  {
     
    if(row.level==2&&row.checked)
    {
      if(!row.disabled)
      {
        this.currentkeys.push(row.id);
        this.currentRoletest.taskdispatchs?.push({
          roleid:this.currentRoletest.id,
          id:ProjectUtil.JsNewGuid(),
          testid:row.id
         });
      }
     
                                                 
    }
    else if(row.level==2&&!row.checked)
    {
      var findex=this.currentRoletest.taskdispatchs?.findIndex((x)=>x.testid==row.id);
      if(findex !=undefined&&findex!=-1)
      {
        this.currentRoletest.taskdispatchs?.splice(findex,1);
      }
      findex=this.currentkeys.findIndex((x)=>x==row.id);
      if(findex !=undefined&&findex!=-1)
      {
        this.currentkeys.splice(findex,1);
      }
    }
    else if(row.level !=2)
    {
      row.children?.map(
        (x)=>
        {
          this.checkaction(x);
        }
      );
    }
  }
  projectaction(row:TaskDispatch)
    {
      this.testprojecthidden='none';
      this.projecthidden='none';
      this.samplehidden='none'; 
      switch(row.level)
      {
        case 0:
          this.projecthidden='inline';
          this.samplehidden='none';
          this.testprojecthidden='none';
          this.currentProject=this.projects.find((x)=>x.id==row.id);
          break;
        case 1:
            this.projecthidden='none';
            this.samplehidden='inline';
            this.testprojecthidden='none';
            this.currentSample=this.samples.find((x)=>x.id==row.id);
            if(this.currentSample==undefined)
            this.currentSample={};
            console.log(this.currentSample);
          break;
        case 2:
            this.projecthidden='none';
            this.samplehidden='none';
            this.testprojecthidden='inline';
            this.currentTestProject=this.testproect.find((x)=>x.id==row.id);
            if(this.currentTestProject==undefined)
            this.currentTestProject={};
          break;
        default:
            this.projecthidden='none';
            this.samplehidden='none';
            this.testprojecthidden='none';
          break;
      }
    }

  getData()
  {
    this.taskTreeData=[];
    this.treeData=[];
   this.service.getroletaskdispatchs(this.contactid).subscribe(
     (p)=>
     {
      
    this.contactservice.getcontactproject(this.contactid+'').subscribe(
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
               this.data=ProjectUtil.getMareData(this.projects,this.ispanding);
               
      }
    }
     
  } 
    );
  }
    );
    
  }
  projectclick(item:any)
  {
    
  }
  roles:RoleTestProject[]=[];
  data:any[]=[];
  settreeData()
  { 
    this.projects.map(
      (y)=>
      {
      this.projecttreeCom.addNode({
           id:y.id,
           pid:undefined,
           label:y.projectnumber 
        });
        y.samples.map(
          (z:any)=>
          {
            this.projecttreeCom.addNode({
              id:z.id,
              pid:y.id,
              label:z.samplename 
           });
           this.samples.push(z);
           var i=0;
           z.testprojects.map(
             (q:any)=>
             { 
               this.testproect.push(q);
               this.projecttreeCom.addNode({
                id:q.id,
                pid:z.id,
                checked:false,
                label:q.testproject 
             }); 
             }
           );
          }
          );
      }
    );
  }
  @ViewChild("projecttreeCom")projecttreeCom:XTreeComponent;
  @ViewChild("treeCom")treeCom:XTreeComponent;
   contactid="";
}
export interface TaskDispatch extends XTreeNode
{
 pid?:string;
 label?:string;
 level?:number;
}