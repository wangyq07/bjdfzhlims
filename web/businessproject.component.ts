 
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'; 
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTableComponent } from '@ng-nest/ui'; 
import { IndexService } from 'src/layout/index/index.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { RoleDiscountService } from 'src/main/system/rolediscount/rolediscount.service';
import { PageBase } from 'src/share/base/base-page';
import { Customer } from 'src/services/CustomerService';
import { ProjectUtil } from 'src/share/utilclass';
import { AddbusinessprojectComponent } from './addbusinessproject/addbusinessproject.component';
import { BusinessProject, ContactProjectService } from './businessproject.service';
import { Contact } from 'src/services/ContactService';

@Component({
  selector: 'app-businessproject',
  templateUrl: './businessproject.component.html',
  styleUrls: ['./businessproject.component.scss']
})
export class BusinessprojectComponent extends PageBase implements OnInit {

  constructor(public indexService:IndexService
              ,private service:ContactProjectService
              ,private msgBox: XMessageBoxService
               ,private msg:XMessageService 
               ,private flowservice:FlowService
               ,private rolediscountservice:RoleDiscountService
              ) {
    super(indexService);
  }
  @Output() ProjectsChange=new EventEmitter<BusinessProject[]>();
  ngOnInit(): void {
  }
  setproject(Project:BusinessProject)
  {
    if(Project !=undefined)
    {
      
     Project.domainlabel=Project.domain?.label;   
  }
  }
  type='add';
  projectchange(Projects:BusinessProject[])
  {
    this.visible=false;
    if(Projects==undefined)
    { 
      return;
    }
     
     var cuindex=Projects.findIndex((x)=>x.id==this.currentproject.id);
     var index=this.data.findIndex((x)=>x.id==this.currentproject.id); 
     if(cuindex==-1&&index!=-1)
     {
       this.data.splice(index,1);
     } 
     for(var i=0;i<Projects.length;i++)
     {
      this.setproject(Projects[i]); 
      var addindex=this.data.findIndex((x)=>x.id==Projects[i].id);
      if( addindex==-1)
      {
        this.data.push(Projects[i]); 
      }
      else
      {
         this.data.splice(addindex,1,Projects[i]); 
      } 
     }
     this.data=[...this.data];
      if(this.ProjectsChange!=undefined)
      {
        this.ProjectsChange.emit(this.data);
      }
  }
  visible=false;
   currentcontact:Contact;
  data:BusinessProject[];
  alldata:BusinessProject[];
  columns: XTableColumn[] = [ 
    { id: 'actions', label: '操作', width: 150 }, 
    { id: 'projectnumber', label: '项目编号', width: 80, sort: true }, 
    { id: 'domainlabel', label: '领域', width: 80, sort: true } 
  ];
  size=20;
  index = 1;
  query: XQuery = { filter: [] };
  total=0; 
  copayaction(type:string)
  { 
  }
  activechange(item:any)
  {
    this.currentproject=item; 
  }
  //CurrentCustomer:Customer;
  getproject()
  { 
    var pjectid=ProjectUtil.JsNewGuid();
    return { 
      contactid:this.currentcontact.id+'',
      id:pjectid,
      projectnumber:'临时项目', 
       reportcount:2, 
       domain:{id:1}, 
       mergereport:0,
      samples:[]
    };  
  }
  @ViewChild("projectlist")projectlist:XTableComponent
   
  activeprojectid="";
  @ViewChild("addbusiness")addbusiness:AddbusinessprojectComponent;
  currentproject:BusinessProject={mergereport:1,reportcount:2};
  setswitch(type:string,project:BusinessProject)
  {
    this.visible=true; 
        this.addbusiness.type=type;  
        this.addbusiness.currentproject=project;
         this.currentproject=project;
        this.addbusiness.currentcontact=this.currentcontact;
        this.addbusiness.setinit(this.data.length); 
  }
  contactdisabled=false;
  action(type:string,item?:any)
  { 
    this.addbusiness.contactdisabled=false;  
    this.contactdisabled=false;
    switch(type)
    { 
     
      case 'add':  
         if(this.currentcontact !=undefined&&this.currentcontact.id!=undefined)
          { 
            if(this.data.length>0)
            {
            this.addbusiness.contactdisabled=true;
            this.contactdisabled=true;
            }
            
          this.setswitch(type,this.getproject());
        }
        break;
      case 'info':
        item.mergereport=0;
        this.setswitch(type,item);
         break; 
      case 'edit':
        item.mergereport=0;
        var currentindex=this.data.findIndex((x)=>x.id== item.id);
        if(currentindex>0)
        {
          this.addbusiness.contactdisabled=true;
          this.contactdisabled=true;
        }
        this.setswitch(type,item);
        break; 
        case 'delete':
          {
            this.msgBox.confirm({
              title: '提示',
              content: `此操作将永久删除此条数据：${item.id}，是否继续？`,
              type: 'warning',
              callback: (action: XMessageBoxAction) => {
                action === 'confirm' &&this.service.delete(item.id).subscribe
                (
                  (x)=>
                  { 
                    var findex= this.data.findIndex((x)=>x.id==item.id);
                     if(findex!=-1)
                     {
                      this.data.splice(findex,1);
                      this.msg.success("删除成功");
                      this.data=[...this.data];
                      if(findex !=0)
                      {
                        this.projectlist.activatedRow=this.data[findex-1];
                      }
                      else if(findex==0&&this.data.length>0)
                      {
                        this.projectlist.activatedRow=this.data[0];
                      }
                     }
                    }
                ) 
          }
    });
    break;
   
  }
 
  case 'submit':
     var delegatecustomer=  item.customers.find((x:any)=>x.customertype==1) ;
     if(delegatecustomer !=undefined&&delegatecustomer.area !=undefined)
     {
       this.rolediscountservice.getrolediscountvaluebyid(delegatecustomer.area
                                   ,this.indexService.auth.user.roles)
                                .subscribe(
                                  (x)=>
                                  {
                                    console.log(x);
                                    this.flowservice.startflow(
                                      {
                                        roles:this.indexService.auth.user.roles
                                        ,customername:delegatecustomer.customername
                                       ,userid:this.indexService.auth.user.id+''
                                       ,username:this.indexService.auth.user.name
                                       ,projectid:item.id
                                       ,instanceKey:'LimsTestProcess'
                                       }
                                    ).subscribe(
                                      (y)=>
                                      {
                                         console.log(y);
                                        this.flowservice.excutetask(
                                         y.TaskId,
                                         {
                                          userid:this.indexService.auth.user.id+''
                                          ,username:this.indexService.auth.user.name
                                          ,projectid:item.id
                                          ,qupricediscount:item.discount
                                          ,limitdiscount:x.discount
                                          ,ugencytype:item.service.id
                                         }
                                        ).subscribe
                                        (
                                          (z)=>
                                          {
                                            console.log(z); 
                                          }
                                        )
                                      }

                                    )
                                  }
                                );
     }
        
      break;
}
}
@Input() auth: { [code: string]: boolean } = {};
submitdisabled:any;
   disabled(item?:any)
   {
      if(item !=null&&item.submit)
      {
         return true;
      }
     return false;
   }
   
  IndexChange(index:number)
  {
    
  }
  getdata()
  {
    this.data=[];
    this.total=0;
    if(this.currentcontact !=undefined&&this.currentcontact.id !=undefined)
    {
      console.log(this.currentproject);
      this.query={filter:[{field:'contactid',value:this.currentcontact.id+'',operation:'='}]};
        this.service.getList(this.index,this.size,this.query).subscribe(
          (x)=>
          {
            [this.data,this.total]=[x.list as BusinessProject[],Number(x.total)];  
            this.data.map((y)=>{this.setproject(y)});
            if(this.activeprojectid !="")
            {
            var findex= this.data.findIndex((x)=>x.id==this.activeprojectid);  
            if(findex !=-1)
            { 
              this.currentproject=this.data[findex];
            }
            else
            {
              this.currentproject=this.data[0];
            }
          }
            else if(this.data.length>0)
            {
            this.currentproject=this.data[0];
          }
          this.projectlist.activatedRow=this.currentproject;  
        }
        );
        
    }
  }
}
