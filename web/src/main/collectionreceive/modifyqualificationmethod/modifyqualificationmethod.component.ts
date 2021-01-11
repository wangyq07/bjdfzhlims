import { Component, OnInit, ViewChild } from '@angular/core';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XSort, XTableColumn, XTableComponent, XTreeComponent, XTreeNode } from '@ng-nest/ui';
import { Qualification, TestProject, TestProjectService } from 'src/main/qualification/qualification.service';
import { DispatchRoleTaskService, RoleTestProject } from '../taskdispatch/taskdispatch.service';
 
 
import { AddmethodqualificationComponent } from './addmethodqualification/addmethodqualification.component';
import { QualificationMethodService } from './modifyqualificationmethod.service';
 

@Component({
  selector: 'app-modifyqualificationmethod',
  templateUrl: './modifyQualificationmethod.component.html',
  styleUrls: ['./modifyQualificationmethod.component.scss']
})
export class ModifyqualificationmethodComponent implements OnInit {
  @ViewChild('treeCom') treeCom: XTreeComponent; 
  @ViewChild('qualtable')qualtable:XTableComponent; 
  constructor(
    private service:TestProjectService,
    private qualimethodservice:QualificationMethodService,
    private roleservice:DispatchRoleTaskService,
    private msgBox:XMessageBoxService,
    private msg:XMessageService
  ) { 
    this.roleservice.getList()
    this.service.getList(1,Number.MAX_SAFE_INTEGER).subscribe((x)=>
    { 
      this.data = x.list as TestProject[] ; 
      this.gettableallData(this.data[0].id);
    }
    );
  }
  indexChange(index: number) {
    this.tablequery={};
    this.tableindex = index; 
    this.gettableData(); 
  }
  roles:RoleTestProject[]=[];
  sortChange(sort: XSort[]) {
    this.tablequery={};
    this.tablequery.sort = sort;
    this.gettableData();
  }
  ngOnInit(): void {
  }
  tableindex=1;
  tablesize=20;
  tabledata:Qualification[];
  tablealldata:Qualification[];
  tabletotal=0;
  tablequery:XQuery={};
  data:TestProject[]=[];
  gettableallData(id:string) { 
    this.tableindex=1; 
    this.qualimethodservice.getqualificationmethods(id).subscribe((x)=>{
       this.tablealldata =x.list as Qualification[]; 
       this.tablequery={}; 
       this.gettableData(); 
       this.roleservice.getroletaskdispatchs('').subscribe(
         (y)=>
         {
           this.roles=y;
         }
       );
    });
    }
    gettableData()
    { 
      this.qualimethodservice.gethandledata(this.tablealldata,this.tableindex,this.tablesize,this.tablequery)
           .subscribe(
              (x)=>
              { 
                 this.tabletotal =Number(x.total); 
                this.tabledata=[...x.list as any[]];  
             }
           )
    }
  displayselquli="none";
  modify=2;
  addvisible=false;
  @ViewChild("addqualificaitonmethod")addqualificaitonmethod:AddmethodqualificationComponent;
  add(tpe:string,item?:Qualification)
  { 
    if(tpe=='add'&&this.qualtable.activatedRow !=null&&this.qualtable.activatedRow !=undefined)
    {
       this.addvisible=true;
       this.addqualificaitonmethod.setMethod(this.qualtable.activatedRow);
    }
    if(tpe=='delete')
    {
      this.msgBox.confirm({
        title: '提示',
        content: `此操作将删除分配的用户或者角色：${item?.testproject}，是否继续？`,
        type: 'warning',
        callback: (action: XMessageBoxAction) => {
          if(action === 'confirm'&&item !=undefined)
              {
                this.qualimethodservice.deletequalificationmethod(item).subscribe(
                  (x)=>
                  {
                     
                    
                   var ffindex= this.tabledata.findIndex((y)=>y.id==x.id);
                   if(ffindex!=-1)
                   {
                    this.tabledata[ffindex]=x;
                    this.tabledata=[...this.tabledata];
                   }
                  }
                  ); 
          }
        }
        });
       }
  }
  datachange(item:Qualification)
  {
     if(item !=null&&item !=undefined)
     {
         this.qualimethodservice.addqualificationmethod(item).subscribe(
           (x)=>
           {
            var ffindex=this.tablealldata.findIndex((x)=>x.id==this.qualtable.activatedRow?.id);
            if(ffindex !=-1)
            {
              this.tablealldata.splice(ffindex,0,item);
            this.tableindex=1;
            this.tablequery={};
            this.gettableData();
            this.msg.success('添加成功');
            }
             
           }
         );
     }
     this.addvisible=false;
  }
  get disabled()
  {
    return false;
  }
  projectsearchkey='';
  methodsearchkey='';
  search()
  {
    if(this.projectsearchkey!=""||this.methodsearchkey)
     { 

        this.qualimethodservice.getqualificationmethodbysearchkey(this.projectsearchkey,this.methodsearchkey)
        .subscribe(
          (x)=>
          {
            this.tablealldata=x.list as Qualification[];
            this.tableindex=1;
            this.tablequery={filter:[]}; 
            this.gettableData();
          }
        );
     }
  }
  tablecolumns:XTableColumn[] =[
    
    { id: 'index', label: '序号',width:80, type: 'index',flex:1 },
    {id:'role',label:'组别',width:100}  , 
    { id: 'testproject', label: '项目',width:150},
    {id:'standardname',label:'标准',width:500},
    { id: 'editmethodname', label: '方法', width:300}
     
  ]
  modifyrows:any[]=[];
  rowchange(type:number,item:any)
  {
    var ffindex=this.modifyrows.findIndex((x)=>x.id==item.id);
    if(ffindex==-1)
    {
    switch(type)
    {
      case 1:
        if(item.beforemethodname!=item.methodname)
        {
           this.modifyrows.push(item);
           item.beforemethodname=item.methodname;
        }
      break;
      case 2:
        if(item.beforeroleid!=item.roleid)
        {
        this.modifyrows.push(item);
        item.beforeroleid=item.roleid;
        }
        break;
      default:
        break;
    }
  }
  }
  activatedId:string;
  tablerowchange(item:any)
  {
     
  }
  save()
  {
     if(this.modifyrows.length>0)
     {
       this.qualimethodservice.updatequalificationmethod(this.modifyrows).subscribe
       (
        (x)=>
        { 

          this.msg.success("保存成功!");
          this.modifyrows=[];//更改行清空
        }
       );
     }
  } 
  selected:XTreeNode;
  action(node:any)
  {
    this.selected = node; 
    this.tableindex=1;
    this.gettableallData(node.id); 
    
  }
}
